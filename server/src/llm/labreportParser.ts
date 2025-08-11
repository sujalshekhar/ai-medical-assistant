import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { InteropZodType } from "@langchain/core/utils/types";
import { LabReportSchema } from "../validations/labreport.schema";

// 1️⃣ Create parser from Zod schema
const parser = StructuredOutputParser.fromZodSchema(
  LabReportSchema as unknown as InteropZodType
);

// 2️⃣ Define system prompt
const prompt = ChatPromptTemplate.fromTemplate(`
You are an expert medical data extractor.
Given the raw text from a lab report, extract all lab test results.

Follow this JSON schema exactly:
{format_instructions}

IMPORTANT:
- Return ONLY valid JSON.
- Do NOT include triple backticks, markdown, or extra text.
- status should be one of: Normal, High, Low, Critical, Unknown.

Raw Lab Report Text:
"{text}"
`);

// 3️⃣ Initialize LLM
const llm = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0,
});

// 4️⃣ Utility to remove unwanted markdown formatting
function cleanLLMOutput(output: string) {
  return output.replace(/```json|```/g, "").trim();
}

// 5️⃣ Main function to parse lab report
export async function parseLabReport(rawText: string) {
  try {
    // Fill prompt
    const formattedPrompt = await prompt.format({
      format_instructions: parser.getFormatInstructions(),
      text: rawText,
    });

    // Call LLM
    const response = await llm.invoke(formattedPrompt);

    // Sanitize LLM output
    const cleaned = cleanLLMOutput(response.content as string);

    // Validate & parse against schema
    return await parser.parse(cleaned);
  } catch (error: any) {
    // If Zod validation fails, give descriptive errors
    if (error?.issues) {
      throw new Error(
        `Validation failed: ${JSON.stringify(error.issues, null, 2)}`
      );
    }
    throw error;
  }
}
