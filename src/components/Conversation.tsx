import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import ConfirmationModal from './ConfirmationModal';
import { saveLearnable } from '../utils/saveLearnable';
import './conversation.css';
import PlayButton from './PlayButton';
import discussionImage from '../assets/images/discussion.jpg';


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
  clickableDistractors: any[];
}

interface ConversationProps {
  token: string;
  id: string;
  fetchLearnables: () => void;
}

function Conversation({ token, id, fetchLearnables }: ConversationProps) {
  const [title, setTitle] = useState<string>('');
  const [conversation, setConversation] = useState<any[]>([]);
  const [clickables, setClickables] = useState<string[]>([]);
  const [clickablesPl, setClickablesPl] = useState<string[]>([]);
  const [clicked, setClicked] = useState<string[]>([]);
  const [discussionQuestions, setDiscussionQuestions] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // State for visible lines
  const [visibleLinesCount, setVisibleLinesCount] = useState<number>(0);

  // Refs for smooth animation
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const loadConversation = async () => {
      if (!id) return;

      const matchedFilePath = Object.keys(conversationModules).find((filePath) => {
        const filename = filePath.split('/').pop()?.replace('.ts', '');

        return filename?.startsWith(id);
      });

      if (matchedFilePath) {
        try {
          const module = (await conversationModules[matchedFilePath]()) as ConversationModule;
          setConversation(module.conversation);
          setClickables(module.clickables);
          setClickablesPl(module.clickablesPl);
          setTitle(module.title);
          setDiscussionQuestions(module.discussionQuestions || []);
        } catch (error) {
          console.error('Error loading conversation:', error);
        }
      } else {
        console.error(`No conversation found for this ID: ${id}`);
        setConversation([]);
        setTitle('No conversation found');
        setStatusMessage(`No conversation found for this ID: ${id}`);
      }
    };

    loadConversation();
  }, [id]);

  const handleClick = (phrase: string) => {
    setClicked((prev) =>
      prev.includes(phrase) ? prev.filter((p) => p !== phrase) : [...prev, phrase]
    );
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const confirmSave = async () => {
    try {
      for (const phrase of clicked) {
        const translation = getTranslation(phrase);
        const learnableData = { phrase, translation };
        await saveLearnable(learnableData, token);
      }
      setStatusMessage('All phrases saved successfully!');
      setClicked([]);
      fetchLearnables();
    } catch (error) {
      console.error('Error saving phrases:', error);
      setStatusMessage('Failed to save phrases');
    } finally {
      setShowModal(false);
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

  // Show the next line
  const showNextLine = () => {
    if (visibleLinesCount < conversation.length) {
      setVisibleLinesCount(visibleLinesCount + 1);
      const currentLine = lineRefs.current[visibleLinesCount];
      if (currentLine) {
        currentLine.style.maxHeight = '500px'; // Trigger the expand animation
        currentLine.style.opacity = '1';
      }
    }
  };

  // Show all lines
  const showAllLines = () => {
    setVisibleLinesCount(conversation.length);
    lineRefs.current.forEach((line, index) => {
      if (line && index < conversation.length) {
        line.style.maxHeight = '500px'; // Trigger the expand animation
        line.style.opacity = '1';
      }
    });
  };

  // Hide the last visible line
  const hideLastLine = () => {
    if (visibleLinesCount > 0) {
      const currentLine = lineRefs.current[visibleLinesCount - 1];
      if (currentLine) {
        currentLine.style.maxHeight = '0'; // Trigger the collapse animation
        currentLine.style.opacity = '0';
      }
      setVisibleLinesCount(visibleLinesCount - 1);
    }
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Align the box at the top
        minHeight: '100vh',
      }}
    >
      {/* Save and Cancel Phrases Buttons (Fixed at the Top) */}
      {clicked.length > 0 && (
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
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
            sx={{ marginRight: '20px' }}
          >
            Save Marked Phrases
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setClicked([])}>
            Cancel
          </Button>
        </Box>
      )}

      {/* Title is always visible */}
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

      {/* Conversation Section */}
      {conversation && conversation.length > 0 ? (
        conversation.map((dialog, index) => (
          <Grid
            container
            key={index}
            ref={(el) => (lineRefs.current[index] = el)} // Store the reference to the line
            className="line" // Add class for CSS animation
            sx={{
              borderBottom: `2px solid ${CellBorderBottomColor}`,
              paddingBottom: '10px',
              marginBottom: '10px',
              fontSize: conversationFontSize,
              alignItems: 'center',
              overflow: 'hidden', // Make sure overflow is hidden for animations
            }}
          >
            {/* Audio Icon Column */}
            <Grid item xs={1}>
              <PlayButton index={index} filePrefix={id} token={token} speaker={dialog.speaker} />
            </Grid>

            {/* Text Column */}
            <Grid item xs={11}>
              <Typography>
                <span style={{ fontWeight: 'bold', color: speakerColor }}>
                  {index + 1}. {dialog.speaker}:
                </span>{' '}
                {renderTextWithClickables(dialog.text)}
              </Typography>
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography sx={{ color: textColor }}>Loading conversation...</Typography>
      )}

      {/* Discussion Section */}
     <Box sx={{ marginTop: '70px', marginBottom: '20px', textAlign: 'center' }}>
       <img
         src={discussionImage}
         alt="Discussion"
         style={{
           maxWidth: '100%',
           borderRadius: '10px',
           boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
           objectFit: 'cover', // Ensures the image covers the area
           objectPosition: 'bottom', // Shows the middle part of the image
           height: '900px', // Adjust the height to control visible area
           width: '100%',
         }}
       />
     </Box>

      {discussionQuestions.length > 0 && (
        <Box sx={{ marginTop: '50px', marginBottom: '60px' }}>
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
                <Typography sx={{ color: textColor, fontSize: conversationFontSize, lineHeight: 1.6 }}>
                  {question}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      {/* Fixed Line Control Buttons (Fixed at the Bottom) */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px 0',
          zIndex: 10000,
          boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.6)',
        }}
      >
        <Button variant="contained" color="primary" onClick={showNextLine} sx={{ marginRight: '20px' }}>
          Show Next Line
        </Button>
        <Button variant="contained" color="secondary" onClick={showAllLines} sx={{ marginRight: '20px' }}>
          Show All Lines
        </Button>
        <Button variant="contained" color="error" onClick={hideLastLine}>
          Hide Last Line
        </Button>
      </Box>

      {/* Status Modal */}
      <ConfirmationModal
        open={!!statusMessage}
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
