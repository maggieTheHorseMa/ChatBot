import React, { useEffect, useRef } from 'react'


enum Role {
    User = 'user',
    Assistant = 'assistant'
  }
type ChatBotResponse = {
  message: string;
  role: Role;
}

type Props = {
    chats: ChatBotResponse[];
}

const ChatMessages = ({chats}: Props) => {
   const messageBoxRef = useRef<HTMLParagraphElement | null>(null);

     useEffect(() => {
    messageBoxRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [chats])
  return (
    <div className='flex flex-col gap-3'>
      {chats.map((chat, index) => 
          <p 
             key={index} 
             ref={index === chats.length-1 ? messageBoxRef : null}
             className={`px-3 py-1 rounded-xl 
              ${chat.role === Role.User ? 
              'bg-blue-500 text-white self-end' 
              : 'bg-gray-100 text-black self-start'}`}>{chat.message}
          </p>)}
    </div>
  )
}

export default ChatMessages
