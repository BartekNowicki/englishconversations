import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Select, MenuItem, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface NavigationPanelProps {
  onConversationSelect: (id: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

function NavigationPanel({ onConversationSelect, isLoggedIn, onLogout }: NavigationPanelProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedConversation, setSelectedConversation] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleConversationChange = (event: any) => {
    const conversationId = event.target.value;
    setSelectedConversation(conversationId);
    navigate(`/${conversationId}`);
    onConversationSelect(conversationId);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      {isLoggedIn && (
        <IconButton
          onClick={toggleDrawer}
          sx={{ color: 'white', position: 'fixed', top: 16, left: 16, zIndex: drawerOpen ? 9999 : 1 }}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}

      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#000',
            color: 'white',
            paddingTop: '75px',
          },
        }}
      >
        <List>
          {isLoggedIn ? (
            <>
              <ListItem sx={{ cursor: 'pointer' }} onClick={() => { onLogout(); toggleDrawer(); }}>
                <ListItemText primary="Logout" />
              </ListItem>
              <ListItem sx={{ cursor: 'pointer' }} onClick={() => { navigate('/phrases'); toggleDrawer(); }}>
                <ListItemText primary="My Phrases" />
              </ListItem>
              <ListItem>
                <Select
                  value={selectedConversation}
                  onChange={handleConversationChange}
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
            </>
          ) : (
            location.pathname !== '/' && (
              <ListItem sx={{ cursor: 'pointer' }} onClick={() => { navigate('/'); toggleDrawer(); }}>
                <ListItemText primary="Login" />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
}

export default NavigationPanel;
