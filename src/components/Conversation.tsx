import { useState, useEffect } from 'react';
import './conversation.css';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

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
    <Box sx={{ padding: '40px' }}>
      <Typography
              variant="h2"
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px'
              }}
            >
              {title}
            </Typography>
      {conversation.length > 0 ? (
        conversation.map((dialog, index) => (
          <Typography key={index} sx={{ lineHeight: 2 }}>
              <span className="speaker">{dialog.speaker}:</span> {renderTextWithClickables(dialog.text)}
          </Typography>
        ))
      ) : (
        <Typography>Loading conversation...</Typography>
      )}
    </Box>
  );
}

export default Conversation;