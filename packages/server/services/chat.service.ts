import { OpenAI } from "openai";
import { ConversationRepository } from "../repositories/conversation.repository";


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export type ChatResponse = {
    id: string;
    message: string;
}

export const chatService = {
    async sendRequest(prompt: any, conversationId: string): Promise<ChatResponse> {
        const response = await client.responses.create({
            model: 'gpt-4o-mini',
            input: prompt,
            temperature: 0.3,
            max_output_tokens: 100,
            previous_response_id: ConversationRepository.getLastResponseId(conversationId), // get the last saved message ID for the current conversation
        });
        console.log('responseeee', response)
        ConversationRepository.setLastResponseId(conversationId, response.id);
        return {
            id: response.id,
            message: response.output_text,
        };  
    }
}
