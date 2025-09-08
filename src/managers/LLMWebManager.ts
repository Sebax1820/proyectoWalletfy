import { CreateMLCEngine,  } from '@mlc-ai/web-llm'

import { LLMBaseManager } from './LLMBaseManager'

// import type { InferenceResult, LLMParams } from './LLMBaseManager'
import type { ChatCompletionMessageParam, MLCEngine } from '@mlc-ai/web-llm'

export class LLMWebLLMManager extends LLMBaseManager {
    private engine: MLCEngine | null = null;

    async loadModel() {
        if (this.engine) {
            console.log(`[WebLLM] Model ${this.modelName} already loaded.`);
            return;
        }

        console.log(`[WebLLM] Loading model ${this.modelName}...`);

        const initProgress = (pr: any) => console.log('Progress:', pr.text);

        this.engine = await CreateMLCEngine(this.modelName, {
            initProgressCallback: initProgress
        });
        this.model = true;
        console.log(`[WebLLM] Model ${this.modelName} loaded.`);
    }

    async unloadModel() {
        if (!this.engine) {
            console.log('[WebLLM No engine to unload.')
            return
        }

        console.log`[WebLLM] Unloading model ${this.modelName}...`

        await this.engine.unload()

        this.engine = null
        this.model = false
        console.log(`[WebLLM] Model ${this.modelName} unloaded.`)
    }

    async infer(prompt: string) {

        if (!this.engine) throw new Error('Engine not loaded.');

        console.log(`[WebLLM] Inferring (sync): ${prompt}`)

        const messages: Array<ChatCompletionMessageParam> = [
            { role: 'system', content: this.systemPrompt },
            { role: 'user', content: prompt},
        ]

        const resp = await this.engine.chat.completions.create({
            messages,
            temperature: this.temperature,
            max_tokens: 2000,
            stream: false,
        })

        const text = resp.choices[0]?.message?.content ?? ''

        return {
            text,
        }
    }

    async *stream(prompt: string) {
        await this.ensureModelLoaded()

        if (!this.engine) throw new Error('Engine not loaded.');

        console.log(`[WebLLM] Streaming: ${prompt}`)

        const messages: Array<ChatCompletionMessageParam> = [
            { role: 'system', content: this.systemPrompt },
            { role: 'user', content: prompt},
        ]

        const streamIter = await this.engine.chat.completions.create({
            messages,
            temperature: this.temperature,
            max_tokens: 2000,
            stream: true,
        })

        for await (const chunk of streamIter) {
            const { content } = chunk.choices[0].delta

            if (content) yield content
        }
    }

}


