export interface LLMParams {
    modelName: string
    temperature?: number
    systemPrompt?: string
    maxTokens?: number
    topK?: number
    topP?: number
}

export interface LLMOptions {
    [key: string]: any
}

export interface InferenceResult {
    text: string
}

const DEFAULT_SYSTEM_PROMPT = `
You are a helpful assistant and your name is WalletAI. Respond to the user's queries based on the provided context and instructions. Always response on same language as the user and say **your name**
`

export abstract class LLMBaseManager {
    protected modelName: string
    protected temperature: number
    protected systemPrompt: string
    protected maxTokens: number
    protected topK: number
    protected topP: number
    protected model: unknown

    constructor(params: LLMParams) {
        this.model = null
        this.modelName = params.modelName
        this.temperature = params.temperature ?? 0.7
        this.systemPrompt = params.systemPrompt ?? DEFAULT_SYSTEM_PROMPT
        this.maxTokens = params.maxTokens ?? 2000
        this.topK = params.topK ?? 0
        this.topP = params.topP ?? 0
    }

    abstract loadModel(): Promise<void> | void
    abstract unloadModel(): Promise<void> | void
    abstract infer(prompt: string): Promise<InferenceResult>
    abstract stream(prompt: string): AsyncIterable<string>

    protected async ensureModelLoaded(): Promise<boolean> {
        if (!this.model) {
            await this.loadModel()
            return true
        }
        return false
    }
}