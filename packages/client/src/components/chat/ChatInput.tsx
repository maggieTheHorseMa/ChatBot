import React, { type Dispatch, type SetStateAction } from 'react'
import { useForm } from 'react-hook-form';
import { Role, type ChatBotResponse } from './ChatBot';
import axios from 'axios';
import { FaArrowUp } from 'react-icons/fa';

type Props = {
    setIsTyping: (isTyping: boolean) => void;
    setChats: Dispatch<SetStateAction<ChatBotResponse[]>>;
    setError: Dispatch<SetStateAction<string>>;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    conversationId: React.MutableRefObject<string | null>;
}

type FormData = {
    prompt: string;
  } 


const ChatInput = ({setIsTyping, setChats, setError, conversationId, onKeyDown}: Props) => {
  const {register, handleSubmit, reset, formState} = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsTyping(true);
    setChats((prev: ChatBotResponse[]) => [...prev, {
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
      setError('Something went wrong, please try again');
    } finally {
      setIsTyping(false);
    }
  }

  return (
        <form
            className='w-full border-1 rounded-xl px-3 py-3 flex flex-col bg-blue-100'
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onKeyDown}
            >
                <textarea
                className='w-full border-0 resize-none focus:outline-0'

                {...register('prompt', {
                    required: true,
                    validate: (data) => data.trim() !== '' || 'Prompt is required'}
                )}
                placeholder="Ask me anything.."
                />
                <button className='bg-black-1000 rounded-full self-end' disabled={!formState.isValid} type="submit"><FaArrowUp/></button>
            </form>
  )
}

export default ChatInput
