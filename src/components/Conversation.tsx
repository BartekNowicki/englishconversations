import { useState, useEffect } from 'react';
import './conversation.css';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const CellBorderBottomColor = 'rgba(128, 128, 128, 0.1)';
const clickableBackground = 'rgba(255, 255, 255, 0.2)';
const clickableBorderColor = 'rgba(118, 255, 3, 0.6)';
const textColor = '#fff';
const speakerColor = 'rgba(118, 255, 3, 0.6)';

const conversationModules = import.meta.glob('../assets/conversations/*.ts');

interface ConversationModule {
  [key: string]: any;
  clickables: string[];
  title: string;
  discussionQuestions: string[]; // Add this for discussion questions
}

function Conversation() {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [conversation, setConversation] = useState<any[]>([]);
  const [clickables, setClickables] = useState<string[]>([]);
  const [clicked, setClicked] = useState<string[]>([]);
  const [discussionQuestions, setDiscussionQuestions] = useState<string[]>([]); // State to store questions

  useEffect(() => {
    const loadConversation = async () => {
      const filePath = `../assets/conversations/conversation${id}.ts`;

      if (conversationModules[filePath]) {
        try {
          const module = (await conversationModules[filePath]()) as ConversationModule;
          setConversation(module[`conversation${id}`]);
          setClickables(module.clickables);
          setTitle(module.title);
          setDiscussionQuestions(module.discussionQuestions || []); // Load questions
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
          style={{
            cursor: 'pointer',
            backgroundColor: clickableBackground,
            padding: '2px 4px',
            borderRadius: '4px',
            color: '#fff',
            transition: 'border 0.3s',
            border: clicked.includes(part)
              ? `1px solid ${clickableBorderColor}`
              : '1px solid transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = `1px solid ${clickableBorderColor}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = clicked.includes(part)
              ? `1px solid ${clickableBorderColor}`
              : '1px solid transparent';
          }}
        >
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <Box
      sx={{
        padding: '40px',
        backgroundColor: '#141414',
        color: textColor,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        border: `2px solid ${CellBorderBottomColor}`,
        borderRadius: '10px',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '40px',
          padding: '20px',
          color: textColor,
        }}
      >
        {title}
      </Typography>
      {conversation.length > 0 ? (
        conversation.map((dialog, index) => (
          <Typography key={index} sx={{ lineHeight: 2, borderBottom: `2px solid ${CellBorderBottomColor}`, paddingBottom: '10px', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', color: speakerColor }}>{index + 1}. {dialog.speaker}:</span>{' '}
            {renderTextWithClickables(dialog.text)}
          </Typography>
        ))
      ) : (
        <Typography sx={{ color: textColor }}>Loading conversation...</Typography>
      )}

      {/* Discussion Section */}
      {discussionQuestions.length > 0 && (
        <Box sx={{ marginTop: '70px', marginBottom: '70px' }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              marginBottom: '10px',
              color: textColor,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}
          >
            Discussion Topics
          </Typography>
          <Typography sx={{ textAlign: 'center', marginBottom: '20px', color: '#aaa' }}>
            Use the phrases from the dialog to discuss the following questions:
          </Typography>
          <ul>
            {discussionQuestions.map((question, index) => (
              <li key={index}>
                <Typography sx={{ color: textColor, fontSize: '1.2rem', lineHeight: 1.6 }}>
                  {question}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
}

export default Conversation;
