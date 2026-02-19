import React from 'react'

type DotProps = {
    className?: string;

}

const TypingIndicator = () => {
  return (
    <div className='flex gap-1 px-3 py-3 bg-gray-100 rounded-xl self-start'>
        <Dot/>
        <Dot className="[animation-delay:0.2s] bg-blue-200"/>
        <Dot className="[animation-delay:0.4s]"/>
    </div>
  )
}

const Dot = ({className}: DotProps) => <div className={`w-2 h-2 rounded-full bg-gray-800 animate-pause ${className}`}/>

export default TypingIndicator
