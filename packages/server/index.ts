import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import express from "express";
import OpenAI from 'openai';
import { chatController } from './controllers/chat.controller';

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const app = express();
//request handle, midleware function, parse request data as json
app.use(express.json());

const port = process.env.PORT || 3000;



app.get('/', (req: Request, res: Response) => {
    res.send(process.env.OPENAI_API_KEY);
})

app.get('/api/hello', (req: Request, res: Response) => {
    res.json({message: 'Hello World'});
})

// const chatRequestSchema = z.object({
//     prompt: z.string()
//     .trim()
//     .min(1, 'Prompt is required')
//     .max(1000, 'Prompt is too long'),
//     conversationId: z.string().uuid(),
// })

app.post('/api/chat', async (req: Request, res:Response) => {
    chatController.sendMessage(req, res);
    // const parseResult = chatRequestSchema.safeParse(req.body);
    // if (!parseResult.success) {
    //     res.status(400).json({ error: parseResult.error.format() });
    //     return;
    // }

    // const {prompt, conversationId} = req.body;

    // try{
    //     const response: ChatResponse = await chatService.sendRequest(prompt, conversationId);
    //     console.log("Response from OpenAI:", response);
    //     res.json({ message: response.message})

    // } catch (error) {
    //     res.status(500).json({ error: 'An error occurred while processing your request.' });
    //     return;
    // }

})


app.listen(port, () => {
    console.log(`Server is running on server on port ${port}`);
})