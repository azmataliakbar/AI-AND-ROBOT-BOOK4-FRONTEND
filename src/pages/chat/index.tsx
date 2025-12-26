// src/pages/chat/index.tsx
import Layout from '@theme/Layout';
import React, { useEffect, useRef, useState } from 'react';
import styles from './chat.module.css';
import { API_ENDPOINTS } from '../../config/api';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  citations?: string[];
};

export default function Chat(): React.ReactElement {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '📚 Hello! I\'m your AI assistant for the Physical AI & Humanoid Robotics Book. Ask me anything about ROS 2, Gazebo/Unity simulation, NVIDIA Isaac, or Vision-Language-Action models!',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check backend health on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.health, {
          method: 'GET',
        });
        if (response.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch (error) {
        console.error('Backend health check failed:', error);
        setBackendStatus('offline');
      }
    };

    checkBackend();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuestion = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.chat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: currentQuestion,
          user_id: null,
          chapter_id: null
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend responded with status ${response.status}`);
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'I received your question but could not generate a response.',
        sender: 'ai',
        timestamp: new Date(),
        citations: data.citations || []
      };

      setMessages(prev => [...prev, aiMessage]);
      setBackendStatus('online');
    } catch (error) {
      console.error('Chat error:', error);
      
      let errorText = '❌ Sorry, I encountered an error. ';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorText += 'Cannot connect to the backend server. Please make sure it\'s running.';
          setBackendStatus('offline');
        } else if (error.message.includes('500')) {
          errorText += 'The server encountered an error. Please try again.';
        } else {
          errorText += `Error: ${error.message}`;
        }
      } else {
        errorText += 'Please try again later.';
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessageText = (text: string) => {
    // Convert markdown-style bold to HTML
    return text.split('**').map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  return (
    <Layout title="AI Chat Assistant">
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <h1>🤖 AI Robotics Assistant</h1>
          <p>Ask me anything about Physical AI & Humanoid Robotics!</p>
          <div className={styles.statusIndicator}>
            Backend: {backendStatus === 'checking' && '🔄 Checking...'}
            {backendStatus === 'online' && '🟢 Online'}
            {backendStatus === 'offline' && '🔴 Offline'}
          </div>
        </div>

        <div className={styles.chatMessages}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${
                message.sender === 'user' ? styles.userMessage : styles.aiMessage
              }`}
            >
              <div className={styles.messageContent}>
                <div className={styles.messageText}>
                  {formatMessageText(message.text)}
                </div>
                {message.citations && message.citations.length > 0 && (
                  <div className={styles.citations}>
                    <strong>📖 Sources:</strong>
                    <ul>
                      {message.citations.map((citation, idx) => (
                        <li key={idx}>{citation}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className={`${styles.message} ${styles.aiMessage}`}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.chatInputForm}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about ROS 2, Gazebo, Unity, NVIDIA Isaac, VLA models..."
            className={styles.chatInput}
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
