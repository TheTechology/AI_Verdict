import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface TextEvidenceItem {
  pillar: "stil_retoric" | "semne_manipulare";
  evidenceType: string;
  description: string;
  textExcerpt?: string;
  confidence: number;
}

export interface TextAnalysisResult {
  rhetoricIntegrityScore: number;
  manipulationRiskScore: number;
  evidenceItems: TextEvidenceItem[];
  summary: string;
}

const ANALYSIS_TOOL: Anthropic.Tool = {
  name: "report_text_analysis",
  description:
    "Reports the rhetorical-style analysis (Pillar 2) and manipulation-signal analysis (Pillar 4) for a piece of text.",
  input_schema: {
    type: "object",
    properties: {
      rhetoricIntegrityScore: {
        type: "number",
        description:
          "0-100. 100 = neutral tone, coherent argumentation, no fallacies, no absolutist language. 0 = excessive emotional tone, clickbait, obvious fallacies.",
      },
      manipulationRiskScore: {
        type: "number",
        description:
          "0-100. 100 = severe propaganda/manipulation indicators (astroturfing, whataboutism, statistical manipulation). 0 = no manipulation indicators.",
      },
      evidenceItems: {
        type: "array",
        items: {
          type: "object",
          properties: {
            pillar: {
              type: "string",
              enum: ["stil_retoric", "semne_manipulare"],
            },
            evidenceType: {
              type: "string",
              description:
                "Stable English snake_case machine tag, ALWAYS in English regardless of the requested response language. E.g. 'excessive_emotional_tone', 'ad_hominem_fallacy', 'absolutist_language', 'statistical_manipulation', 'fabricated_expertise'.",
            },
            description: { type: "string" },
            textExcerpt: {
              type: "string",
              description: "The exact fragment from the text that illustrates the evidence, if any.",
            },
            confidence: { type: "number", description: "0-100" },
          },
          required: ["pillar", "evidenceType", "description", "confidence"],
        },
      },
      summary: {
        type: "string",
        description: "Short, natural-language summary of the main findings (2-3 sentences).",
      },
    },
    required: ["rhetoricIntegrityScore", "manipulationRiskScore", "evidenceItems", "summary"],
  },
};

const RESPONSE_LANGUAGE: Record<string, string> = {
  en: "English",
  ro: "Romanian",
};

function buildSystemPrompt(languageName: string): string {
  return `You are the analysis engine of VERIDIC, a media-literacy web app that helps citizens evaluate informational content.
App philosophy: "We don't tell you what to believe. We show you what to observe." You analyze STYLE and rhetorical/manipulation techniques, not the factual truth of the claims.
Be precise, quote exact fragments from the text as evidence, and do not flag legitimate opinions or controversial-but-legitimate content as manipulation just because you disagree with the position expressed.
Write the "description" and "summary" fields in ${languageName}. The "evidenceType" field must ALWAYS be an English snake_case tag, regardless of the response language.
Report the result EXCLUSIVELY through the provided tool call.`;
}

export async function analyzeTextStyle(text: string, locale: string = "en"): Promise<TextAnalysisResult> {
  const languageName = RESPONSE_LANGUAGE[locale] ?? RESPONSE_LANGUAGE.en;

  const message = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 2048,
    system: buildSystemPrompt(languageName),
    tools: [ANALYSIS_TOOL],
    tool_choice: { type: "tool", name: ANALYSIS_TOOL.name },
    messages: [
      {
        role: "user",
        content: `Analyze the following text per Pillar 2 (rhetorical style) and Pillar 4 (manipulation signals). Respond in ${languageName}:\n\n"""${text}"""`,
      },
    ],
  });

  const toolUse = message.content.find((block) => block.type === "tool_use") as
    | { type: "tool_use"; input: unknown }
    | undefined;

  if (!toolUse) {
    throw new Error("The analysis engine did not return a structured result.");
  }

  return toolUse.input as TextAnalysisResult;
}
