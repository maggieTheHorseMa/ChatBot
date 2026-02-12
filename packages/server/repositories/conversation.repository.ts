import { set } from "zod";

//Implementation detail
const conversations = new Map<string, string>();

export const ConversationRepository = {
    getLastResponseId: (conversationId: string): string | undefined => {
        return conversations.get(conversationId);   
    },    
    setLastResponseId: (conversationId: string, responseId: string): void => {
        conversations.set(conversationId, responseId);
    }
}
