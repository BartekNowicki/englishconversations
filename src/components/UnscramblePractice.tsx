import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { loadConversationById } from '../utils/loadConversation';
import UnscramblePracticeSession from './UnscramblePracticeSession';
import ConversationSelection from './ConversationSelection';

const UnscramblePractice = () => {
  const { id } = useParams<{ id: string }>(); // Get conversation ID from the URL
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // If conversation ID exists, load the conversation
  useEffect(() => {
    const fetchConversation = async () => {
      if (id) {
        try {
          setLoading(true);
          const conversationData = await loadConversationById(id);
          setSelectedConversation(conversationData);
        } catch (error) {
          setError('Failed to load conversation');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchConversation();
  }, [id]);

  const handleStartPractice = (selectedId: string) => {
    navigate(`/practice/unscramble/${selectedId}`); // Use only the ID (e.g., /1a)
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141414',
        width: '100%',
      }}
    >
      {!id && <ConversationSelection onStartPractice={handleStartPractice} />}

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {selectedConversation && (
        <UnscramblePracticeSession conversation={selectedConversation} />
      )}
    </Box>
  );
};

export default UnscramblePractice;
