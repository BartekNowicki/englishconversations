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
          backgroundColor: '#000',
          color: 'white',
        },
      }}
    >
      <List>
        <ListItem sx={{ cursor: 'default' }} button="true" onClick={() => navigate('/')}>
          <ListItemText primary="Login" />
        </ListItem>

        <ListItem sx={{ cursor: 'default' }} button="true" onClick={() => navigate('/phrases')}>
          <ListItemText primary="My Phrases" />
        </ListItem>

        <ListItem sx={{ cursor: 'default' }} >
          <Select
            value={selectedConversation}
            onChange={handleConversationChange}
            displayEmpty
            fullWidth
            sx={{
              backgroundColor: '#fff', // Light background for the select
              color: '#000', // Black text inside the select
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff', // White border for the dropdown
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff', // Keep the border white when focused
              },
              '.MuiSvgIcon-root': {
                color: '#000', // Black arrow icon for contrast
              },
            }}
          >
            <MenuItem value="" disabled>
              <em>Select a Conversation</em>
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
