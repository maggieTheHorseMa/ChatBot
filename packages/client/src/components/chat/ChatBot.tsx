import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

type FormData = {
    prompt: string;
  } 

export enum Role {
    User = 'user',
    Assistant = 'assistant'
  }

export type ChatBotResponse = {
  message: string;
  role: Role;
}


const ChatBox = () => {
  const {handleSubmit, reset} = useForm<FormData>();
  const conversationId = useRef(crypto.randomUUID());
  const [chats, setChats] = useState<ChatBotResponse[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: FormData) => {
    setIsTyping(true);
    setChats(prev => [...prev, {
      message: data.prompt,
      role: Role.User
    }]);
    try {
      setError('');
      const response = await axios.post<ChatBotResponse>('/api/chat', {
        prompt: data.prompt,
        conversationId: conversationId.current,
      });
  
      setIsTyping(false);
      setChats(prev => [...prev, {
        message: response.data.message,
        role: Role.Assistant
      }]);
      reset();
    } catch(e){
      console.log('there is an error here!!!', e)
      setError('Something went wrong, please try again');
    } finally {
      setIsTyping(false);
    }
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter' && !e.shiftKey) {
          console.log("Enter key pressed without Shift");
          e.preventDefault(); 
          handleSubmit(onSubmit)();
        }
      }


  return (
      <div className='flex flex-col gap-3 mb-10 px-4 h-full'>
        {/* Message box */}
        <div
          className='flex flex-col flex-1 gap-3 overflow-y-auto'> 
          <ChatMessages chats={chats}></ChatMessages>
          {isTyping && (
            <div className='flex gap-1 px-3 py-3 bg-gray-100 rounded-xl self-start'>
              <div className='w-2 h-2 rounded-full bg-gray-800 animate-pulse'/>
              <div className='w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s]'/>
              <div className='w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.4s]'/>
            </div>
          )}
          {error && <div className='text-red-600'>{error}</div>}
        </div>
        <ChatInput setIsTyping={setIsTyping}
        setChats={setChats}
        setError={setError}
        conversationId={conversationId}
        onKeyDown={onKeyDown}></ChatInput>
      </div>
  );
}

export default ChatBox;