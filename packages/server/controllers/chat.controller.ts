import type { Request, Response} from 'express';
import z from 'zod';
import { chatService, type ChatResponse } from '../services/chat.service';


const chatRequestSchema = z.object({
    prompt: z.string()
    .trim()
    .min(1, 'Prompt is required')
    .max(1000, 'Prompt is too long'),
    conversationId: z.string().uuid(),
})
export const chatController = {
    async sendMessage(req: Request, res: Response) {
        const parseResult = chatRequestSchema.safeParse(req.body);
        console.log('input')
        if (!parseResult.success) {
            res.status(400).json({ error: parseResult.error.format() });
            return;
        }
    
        const {prompt, conversationId} = req.body;
    
        try{
            const response: ChatResponse = await chatService.sendRequest(prompt, conversationId);
            console.log("Response from OpenAI:", response);
            res.json({ message: response.message})
    
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while processing your request.' });
            return;
        }
        
        


    }

}