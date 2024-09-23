import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Select, MenuItem, SelectChangeEvent } from '@mui/material';

// Define the type for the props, including `onConversationSelect`
interface NavigationPanelProps {
  onConversationSelect: (id: string) => void;
}

function NavigationPanel({ onConversationSelect }: NavigationPanelProps) {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState('');

  // Update the event type to `SelectChangeEvent`
  const handleConversationChange = (event: SelectChangeEvent) => {
    const conversationId = event.target.value as string;
    setSelectedConversation(conversationId);
    navigate(`/${conversationId}`);
    onConversationSelect(conversationId); // Call the function passed via props
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#000',
          color: 'white',
        },
      }}
    >
      <List>
        <ListItem sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <ListItemText primary="Login" />
        </ListItem>

        <ListItem sx={{ cursor: 'pointer' }} onClick={() => navigate('/phrases')}>
          <ListItemText primary="My Phrases" />
        </ListItem>

        <ListItem>
          <Select
            value={selectedConversation}
            onChange={handleConversationChange}  // This is now correctly typed
            displayEmpty
            fullWidth
            sx={{
              color: 'white',
              '& .MuiSelect-icon': { color: 'white' },
            }}
          >
            <MenuItem value="" disabled>
              Select a Conversation
            </MenuItem>
            <MenuItem value="1a">Conversation 1a</MenuItem>
            <MenuItem value="1b">Conversation 1b</MenuItem>
          </Select>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default NavigationPanel;
