import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Conversation from '../components/Conversation';

function ConversationPage({ token }: { token: string }) {
  // Extract the conversation ID from the URL using useParams
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      {/* Pass the extracted ID and token to the Conversation component */}
      <Conversation token={token} id={id || ''} />
    </Box>
  );
}

export default ConversationPage;
