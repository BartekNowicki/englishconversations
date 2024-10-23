import { useEffect, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { conversationModules } from '../utils/loadConversation';

interface ConversationSelectionProps {
  onStartPractice: (selectedIds: string[]) => void;
  multipleSelection?: boolean;
}

const ConversationSelection: React.FC<ConversationSelectionProps> = ({ onStartPractice, multipleSelection = false }) => {
  const [selectedConversationIds, setSelectedConversationIds] = useState<string[]>(multipleSelection ? [] : '');
  const [availableConversations, setAvailableConversations] = useState<{ id: string, title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);
        const conversations = Object.keys(conversationModules).map((filePath) => {
          const id = filePath.split('/').pop()?.replace('.ts', '').split('_')[0] || ''; // Extract just the ID (e.g., 1a)
          const title = filePath.split('/').pop()?.replace('.ts', '').replace(/_/g, ' ') || '';
          return { id, title };
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
    const value = event.target.value;
    if (multipleSelection) {
      setSelectedConversationIds(value);
    } else {
      setSelectedConversationIds([value]);
    }
  };

  const handleStartPractice = () => {
    if (selectedConversationIds.length > 0) {
      onStartPractice(selectedConversationIds);
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
          value={selectedConversationIds}
          onChange={handleConversationSelect}
          multiple={multipleSelection}  // Enable multiple selection if prop is true
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
        disabled={selectedConversationIds.length === 0}
        sx={{ backgroundColor: '#fff', color: '#000' }}
      >
        Start Practice
      </Button>
    </Box>
  );
};

export default ConversationSelection;
