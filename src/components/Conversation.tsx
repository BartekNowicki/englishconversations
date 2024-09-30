import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ConfirmationModal from './ConfirmationModal';
import { saveLearnable } from '../utils/saveLearnable';

const CellBorderBottomColor = 'rgba(128, 128, 128, 0.1)';
const clickableBackground = 'rgba(255, 255, 255, 0.2)';
const clickableBorderColor = 'rgba(118, 255, 3, 0.6)';
const textColor = '#fff';
const speakerColor = 'rgba(118, 255, 3, 0.6)';
const conversationFontSize = '1.2rem';

const conversationModules = import.meta.glob('../assets/conversations/*.ts');

interface ConversationModule {
  [key: string]: any;
  clickables: string[];
  clickablesPl: string[];
  title: string;
  discussionQuestions: string[];
}

function Conversation({ token, id }: { token: string, id: string }) {
  const [title, setTitle] = useState<string>('');
  const [conversation, setConversation] = useState<any[]>([]);
  const [clickables, setClickables] = useState<string[]>([]);
  const [clickablesPl, setClickablesPl] = useState<string[]>([]); // Store the Polish version of clickables
  const [clicked, setClicked] = useState<string[]>([]);
  const [discussionQuestions, setDiscussionQuestions] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null); // To track message content

  useEffect(() => {
    const loadConversation = async () => {
      const filePath = `../assets/conversations/${id}_passing_of_time.ts`;

      if (conversationModules[filePath]) {
        try {
          const module = (await conversationModules[filePath]()) as ConversationModule;
          setConversation(module[`conversation${id}`]);
          setClickables(module.clickables);
          setClickablesPl(module.clickablesPl);
          setTitle(module.title);
          setDiscussionQuestions(module.discussionQuestions || []);
        } catch (error) {
          console.error('Error loading conversation:', error);
        }
      } else {
        console.error(`No conversation found for this ID: ${id}`);
      }
    };

    if (id) {
      loadConversation();
    }
  }, [id]);

  const handleClick = (phrase: string) => {
    setClicked((prev) =>
      prev.includes(phrase) ? prev.filter((p) => p !== phrase) : [...prev, phrase]
    );
  };

  const handleSave = () => {
    setShowModal(true); // Open confirmation modal
  };

  const confirmSave = async () => {
    try {
      for (const phrase of clicked) {
        const translation = getTranslation(phrase);
        const learnableData = { phrase, translation };
        await saveLearnable(learnableData, token);
      }
      setStatusMessage('All phrases saved successfully!');
      setClicked([]); // Reset clicked phrases
    } catch (error) {
      console.error('Error saving phrases:', error);
      setStatusMessage('Failed to save phrases');
    } finally {
      setShowModal(false); // Close confirmation modal
    }
  };

  const getTranslation = (phrase: string): string => {
    const index = clickables.indexOf(phrase);
    return index !== -1 ? clickablesPl[index] : '';
  };

  const renderTextWithClickables = (text: string) => {
    const parts = text.split(new RegExp(`(${clickables.join('|')})`, 'g'));
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
        position: 'relative',
      }}
    >
      {/* Fixed Black Overlay Bar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px 0',
          zIndex: 10000,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
        }}
      >
        {clicked.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save Marked Phrases
          </Button>
        )}
      </Box>

      <Typography
        variant="h2"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '40px',
          padding: '20px',
          color: textColor,
          marginTop: '60px',
        }}
      >
        {title}
      </Typography>

      {/* Conversation Section */}
      {conversation.length > 0 ? (
        conversation.map((dialog, index) => (
          <Typography
            key={index}
            sx={{
              lineHeight: 2,
              borderBottom: `2px solid ${CellBorderBottomColor}`,
              paddingBottom: '10px',
              marginBottom: '10px',
              fontSize: conversationFontSize,
            }}
          >
            <span style={{ fontWeight: 'bold', color: speakerColor }}>
              {index + 1}. {dialog.speaker}:
            </span>{' '}
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
              fontWeight: 'bold',
            }}
          >
            Discussion Topics
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              marginBottom: '20px',
              color: '#aaa',
              fontSize: conversationFontSize,
            }}
          >
            Use the phrases from the dialog to discuss the following questions:
          </Typography>
          <ul>
            {discussionQuestions.map((question, index) => (
              <li key={index}>
                <Typography
                  sx={{
                    color: textColor,
                    fontSize: conversationFontSize,
                    lineHeight: 1.6,
                  }}
                >
                  {question}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      {/* Status Modal */}
      <ConfirmationModal
        open={!!statusMessage} // Show modal if there's a message
        onClose={() => setStatusMessage(null)}
        title={statusMessage || ''}
        isMessage={true}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmSave}
        title="Are you sure you want to save the following phrases?"
        items={clicked}
      />
    </Box>
  );
}

export default Conversation;
