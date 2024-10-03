import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Conversation from '../components/Conversation';

interface ConversationPageProps {
  token: string;
  fetchLearnables: () => void;
}

function ConversationPage({ token, fetchLearnables }: ConversationPageProps) {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <Conversation token={token} id={id || ''} fetchLearnables={fetchLearnables} />
    </Box>
  );
}

export default ConversationPage;
