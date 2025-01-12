'use client';
import { generateChatResponse } from '@/utils/action';
import { useMutation } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { FaBookMedical } from "react-icons/fa";
import Markdown from 'react-markdown'




const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (query) => {
        const response = await fetch('https://medicgpt-backend.onrender.com/generate-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ textMessage: query.parts[0].text }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.response;
    },

    onSuccess: (data) => {
      const resp = {
        role: "model",
        parts: [{ text: data }],
      }
      setMessages((prev) => [...prev, resp]);
    },
    onError: (error) => {
      console.log(error);
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(text);
    const query = {
      role: "user",
      parts: [{ text: text }],
    }
    mutate(query);
    setMessages([...messages, query])
    setText('')
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);



  return (
    <div className='min-h-[calc(100vh-8rem)] grid grid-rows-[1fr,auto]'>
      {messages.length===0? <div className='grid place-items-center max-w-3xl'>
        <FaBookMedical className='w-24 h-24 text-primary ' />
      </div>: ''}
      <div className='max-h-[calc(100vh-12rem)] overflow-auto'>
        {messages.map(({ role, parts }, index) => {
          const avatar = role == 'user' ? '👤' : '🤖';
          const bcg = role == 'user' ? 'bg-base-200 ' : 'bg-base-100';
          const alignment = role == 'user' ? 'flex-row-reverse' : '';
          return (
            <div
              key={index}
              className={`flex ${alignment} py-6 pl-0 md:pl-2 px-8 text-justify max-w-4xl
               text-md leading-loose border-b border-base-300 ${bcg}`}
            >
              <span className={`${role==='user'?'ml-4':'mr-4'}`}>{avatar}</span>
              <div className='max-w-3xl'><Markdown>{parts[0].text}</Markdown></div>
            </div>
          );
        })}
        {isPending && <span className='loading'></span>}
        <div ref={messagesEndRef} />
      </div>


      <form onSubmit={handleSubmit} className='max-w-4xl pt-12 w-full'>
        <div className='join w-full'>
          <input
            type='text'
            placeholder='Message MedicGPT'
            className='input input-bordered join-item w-full'
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button className='btn btn-primary join-item' type='submit'>
            ask question
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;