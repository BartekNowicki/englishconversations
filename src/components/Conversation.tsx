import React, { useState, useEffect } from 'react';
import './conversation.css';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

// Dynamically load all conversation files in the "assets/conversations" folder
const conversationModules = import.meta.glob('../assets/conversations/*.ts');

interface ConversationModule {
  [key: string]: any;
  clickables: string[];
  title: string;
}

function Conversation() {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [conversation, setConversation] = useState<any[]>([]);
  const [clickables, setClickables] = useState<string[]>([]);
  const [clicked, setClicked] = useState<string[]>([]);

  useEffect(() => {
    const loadConversation = async () => {
      const filePath = `../assets/conversations/conversation${id}.ts`;

      if (conversationModules[filePath]) {
        try {
          const module = (await conversationModules[filePath]()) as ConversationModule;
          setConversation(module[`conversation${id}`]);
          setClickables(module.clickables);
          setTitle(module.title);
        } catch (error) {
          console.error('Error loading conversation:', error);
        }
      } else {
        console.error('No conversation found for this ID');
      }
    };

    loadConversation();
  }, [id]);

  const handleClick = (phrase: string) => {
    setClicked(prev =>
      prev.includes(phrase)
        ? prev.filter(p => p !== phrase)
        : [...prev, phrase]
    );
  };

  const renderTextWithClickables = (text: string) => {
    const parts = text.split(new RegExp(`(${clickables.join("|")})`, "g"));
    return parts.map((part, index) =>
      clickables.includes(part) ? (
        <span
          key={index}
          onClick={() => handleClick(part)}
          className={`clickable ${clicked.includes(part) ? 'clicked' : ''}`}
        >
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="central-wrapper">
      <div className="central-pane">
        <h2>{title}</h2>
        {conversation.length > 0 ? (
          conversation.map((dialog, index) => (
            <p key={index} className="dialog-line">
              <strong>{dialog.speaker}:</strong> {renderTextWithClickables(dialog.text)}
            </p>
          ))
        ) : (
          <Typography>Loading conversation...</Typography>
        )}
      </div>
    </div>
  );
}

export default Conversation;
