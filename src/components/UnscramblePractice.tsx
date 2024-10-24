import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { loadConversationById } from '../utils/loadConversation';
import UnscramblePracticeSession from './UnscramblePracticeSession';
import ConversationSelection from './ConversationSelection';
import { Learnable } from '../types';

interface UnscramblePracticeProps {
  token: string;
  userLearnables: Learnable[];
}

const UnscramblePractice: React.FC<UnscramblePracticeProps> = ({ token, userLearnables }) => {
  const { id } = useParams<{ id: string }>();
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    navigate(`/practice/unscramble/${selectedId}`);
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
        <UnscramblePracticeSession conversation={selectedConversation} token={token} userLearnables={userLearnables}/>
      )}
    </Box>
  );
};

export default UnscramblePractice;
