import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';

type FormData = {
    prompt: string;
} 

type ChatBotResponse = {
  message: string;
}

const ChatBox = () => {
  const conversationId = useRef(crypto.randomUUID());
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const {register, handleSubmit, reset, formState} = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(conversationId.current);
    setMessages(prev => [...prev, data.prompt]);
    const response = await axios.post<ChatBotResponse>('/api/chat', {
      prompt: data.prompt,
      conversationId: conversationId.current,
    });

    setMessages(prev => [...prev, data.prompt]);
    setMessages(prev => [...prev, response.data.message]);

    console.log("response data:", response.data);
    reset();
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter' && !e.shiftKey) {
          console.log("Enter key pressed without Shift");
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
      }

  return (
      <div>
        <div>{messages.map((message, index) => <p key={index}>{message}</p>)}</div>
        <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
        style={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <textarea
            {...register('prompt', {
              required: true,
              validate: (data) => data.trim() !== '' || 'Prompt is required'}
            )}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send message..."
            style={{
              padding: '8px',
              boxSizing: 'border-box',
              borderRadius: '4px',
              border: '1px solid #444',
              background: 'transparent',
              height: '300px',
              width: '600px'
            }}
          />
         <button
          disabled={formState.isValid}
          type="submit"
          style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
          <FaArrowUp
            style={{
              padding: '8px',
              border: '1px solid #6200ea',
              backgroundColor: '#6200ea',
              borderRadius: '50%',
              color: 'white',
              fontSize: '20px'
            }}
          />
        </button>
        </form>
      </div>
  );
}

export default ChatBox;