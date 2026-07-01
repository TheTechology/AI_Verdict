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
  name: "raport_analiza_text",
  description:
    "Raportează rezultatul analizei de stil retoric (Pilonul 2) și semne de manipulare (Pilonul 4) pentru un fragment de text.",
  input_schema: {
    type: "object",
    properties: {
      rhetoricIntegrityScore: {
        type: "number",
        description:
          "0-100. 100 = ton neutru, argumentare coerentă, fără sofisme, fără limbaj absolutist. 0 = ton emoțional excesiv, clickbait, sofisme evidente.",
      },
      manipulationRiskScore: {
        type: "number",
        description:
          "0-100. 100 = indicatori severi de propagandă/manipulare (astroturfing, whataboutism, manipulare statistică). 0 = fără indicatori de manipulare.",
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
                "Ex: 'ton_emotional_excesiv', 'sofism_ad_hominem', 'limbaj_absolutist', 'manipulare_statistica', 'fabricare_expertiza'.",
            },
            description: { type: "string" },
            textExcerpt: {
              type: "string",
              description: "Fragmentul exact din text care ilustrează dovada, dacă există.",
            },
            confidence: { type: "number", description: "0-100" },
          },
          required: ["pillar", "evidenceType", "description", "confidence"],
        },
      },
      summary: {
        type: "string",
        description: "Rezumat scurt, în limbaj natural, al principalelor concluzii (2-3 fraze).",
      },
    },
    required: ["rhetoricIntegrityScore", "manipulationRiskScore", "evidenceItems", "summary"],
  },
};

const SYSTEM_PROMPT = `Ești motorul de analiză al platformei VERIDIC, un instrument de alfabetizare media care ajută cetățenii să evalueze conținut informațional.
Filozofia platformei: "Nu îți spunem ce să crezi. Îți arătăm ce să observi." Analizezi STIL și tehnici retorice/de manipulare, nu adevărul de fond al afirmațiilor.
Fii precis, citează fragmente exacte din text ca dovezi, și nu marca opinii legitime sau conținut controversat-dar-legitim ca manipulare doar pentru că nu ești de acord cu poziția exprimată.
Raportează rezultatul EXCLUSIV prin apelul instrumentului furnizat.`;

export async function analyzeTextStyle(text: string): Promise<TextAnalysisResult> {
  const message = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    tools: [ANALYSIS_TOOL],
    tool_choice: { type: "tool", name: ANALYSIS_TOOL.name },
    messages: [
      {
        role: "user",
        content: `Analizează următorul text conform Pilonului 2 (stil retoric) și Pilonului 4 (semne de manipulare):\n\n"""${text}"""`,
      },
    ],
  });

  const toolUse = message.content.find((block) => block.type === "tool_use") as
    | { type: "tool_use"; input: unknown }
    | undefined;

  if (!toolUse) {
    throw new Error("Motorul de analiză nu a returnat un rezultat structurat.");
  }

  return toolUse.input as TextAnalysisResult;
}
