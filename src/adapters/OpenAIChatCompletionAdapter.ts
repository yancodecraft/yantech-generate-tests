import OpenAI from "openai";
import {
  ChatCompletion,
  ChatCompletionOptions,
  ChatCompletionResponse,
} from "../core/ports";

export class OpenAIChatCompletionAdapter implements ChatCompletion {
  private openai: OpenAI;

  constructor(apiKey?: string) {
    this.openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });
  }

  async create(
    options: ChatCompletionOptions
  ): Promise<ChatCompletionResponse> {
    const completion = await this.openai.chat.completions.create({
      model: options.model,
      messages: options.messages,
      temperature: options.temperature,
      max_tokens: options.max_tokens,
      response_format: options.response_format,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Aucune réponse reçue d'OpenAI");
    }

    return { content };
  }
}
