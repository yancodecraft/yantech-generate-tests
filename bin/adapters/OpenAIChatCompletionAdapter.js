"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIChatCompletionAdapter = void 0;
const openai_1 = __importDefault(require("openai"));
class OpenAIChatCompletionAdapter {
    constructor(apiKey) {
        this.openai = new openai_1.default({
            apiKey: apiKey || process.env.OPENAI_API_KEY,
        });
    }
    create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const completion = yield this.openai.chat.completions.create({
                model: options.model,
                messages: options.messages,
                temperature: options.temperature,
                max_tokens: options.max_tokens,
                response_format: options.response_format,
            });
            const content = (_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
            if (!content) {
                throw new Error("Aucune réponse reçue d'OpenAI");
            }
            return { content };
        });
    }
}
exports.OpenAIChatCompletionAdapter = OpenAIChatCompletionAdapter;
