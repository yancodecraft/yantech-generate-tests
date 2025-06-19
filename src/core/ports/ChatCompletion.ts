export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionOptions {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  response_format?: { type: "json_object" | "text" };
}

export interface ChatCompletionResponse {
  content: string;
}

export interface ChatCompletion {
  create(options: ChatCompletionOptions): Promise<ChatCompletionResponse>;
}
