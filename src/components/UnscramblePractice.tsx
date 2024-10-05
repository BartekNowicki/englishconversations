import { useEffect, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { loadConversationById, conversationModules } from '../utils/loadConversation';

const UnscramblePractice = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string>('');
  const [availableConversations, setAvailableConversations] = useState<{ id: string, title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);
        const conversations = Object.keys(conversationModules).map((filePath) => {
          const id = filePath.split('/').pop()?.replace('.ts', '') || '';
          return { id, title: id.replace(/_/g, ' ') };
        });
        setAvailableConversations(conversations);
        setLoading(false);
      } catch (error) {
        setError('Failed to load conversations');
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  const handleConversationSelect = (event: any) => {
    setSelectedConversationId(event.target.value);
  };

  const handleStartPractice = async () => {
    if (selectedConversationId) {
      try {
        const conversationData = await loadConversationById(selectedConversationId);
        console.log('Selected conversation data:', conversationData);
      } catch (error) {
        console.error('Failed to load conversation:', error);
        setError('Failed to load selected conversation.');
      }
    }
  };

  if (loading) {
    return <Typography sx={{ color: '#fff' }}>Loading conversations...</Typography>;
  }

  if (error) {
    return <Typography sx={{ color: 'red' }}>{error}</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141414',
      }}
    >
      <Typography variant="h4" sx={{ color: '#fff', marginBottom: '20px' }}>
        Select the source of phrases to practice
      </Typography>

      <FormControl fullWidth sx={{ maxWidth: 400, marginBottom: '20px' }}>
        <InputLabel sx={{ color: '#fff' }}>Source</InputLabel>
        <Select
          value={selectedConversationId}
          onChange={handleConversationSelect}
          sx={{ color: '#fff', borderBottom: '1px solid white' }}
        >
          {availableConversations.map((conversation) => (
            <MenuItem key={conversation.id} value={conversation.id}>
              {conversation.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleStartPractice}
        disabled={!selectedConversationId}
        sx={{ backgroundColor: '#fff', color: '#000' }}
      >
        Start Practice
      </Button>
    </Box>
  );
};

export default UnscramblePractice;
