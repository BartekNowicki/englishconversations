import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Select, MenuItem } from '@mui/material';

function NavigationPanel() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState('');

  const handleConversationChange = (event: any) => {
    const conversationId = event.target.value;
    setSelectedConversation(conversationId);
    navigate(`/${conversationId}`);
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
        },
      }}
    >
      <List>
        <ListItem button="true" onClick={() => navigate('/')}>
          <ListItemText primary="Login" />
        </ListItem>

        <ListItem button="true" onClick={() => navigate('/phrases')}>
          <ListItemText primary="My Phrases" />
        </ListItem>

        <ListItem>
          <Select
            value={selectedConversation}
            onChange={handleConversationChange}
            displayEmpty
            fullWidth
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
