import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Select, MenuItem, IconButton, Box, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';

interface NavigationPanelProps {
  onConversationSelect: (id: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  errorMessage: string;
}

const conversationModules = import.meta.glob('../assets/conversations/*.ts'); // Access all conversation files

function NavigationPanel({ onConversationSelect, isLoggedIn, onLogout }: NavigationPanelProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedConversation, setSelectedConversation] = useState('');
  const [availableConversations, setAvailableConversations] = useState<{ id: string; title: string }[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const loadConversations = () => {
      const filenames = Object.keys(conversationModules);

      const conversations = filenames.map((filePath) => {
        const filename = filePath.split('/').pop()?.replace('.ts', '');
        if (filename) {
          const [number, ...titleParts] = filename.split('_');
          const title = titleParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          return { id: number, title: `${number} ${title}` };
        }
        return null;
      }).filter(Boolean) as { id: string; title: string }[];

      setAvailableConversations(conversations);
    };

    loadConversations();
  }, []);

  const handleConversationChange = (event: any) => {
    const conversationId = event.target.value;
    setSelectedConversation(conversationId);
    navigate(`/conversation/${conversationId}`);
    onConversationSelect(conversationId);
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  // Shared button style
  const buttonStyle = {
    cursor: 'pointer',
    color: 'white',
    padding: '15px 20px',
    backgroundColor: '#282828',
    border: '1px solid #444',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    '&:hover': {
      backgroundColor: '#333',
      transform: 'scale(1.02)',
      borderColor: '#555',
    },
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
            backgroundColor: '#1e1e1e',
            color: 'white',
            paddingTop: '75px',
            paddingBottom: '20px',
          },
        }}
      >
        <List>
          {isLoggedIn && (
            <>
              {/* Home button with Home Icon */}
              <ListItem
                component="button"
                onClick={() => { navigate('/'); toggleDrawer(); }}
                sx={buttonStyle}
              >
                <ListItemIcon>
                  <HomeIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>

              {/* Logout button */}
              <ListItem
                component="button"
                onClick={() => { handleLogoutClick(); toggleDrawer(); }}
                sx={buttonStyle}
              >
                <ListItemText primary="Logout" />
              </ListItem>

              {/* My Phrases button */}
              <ListItem
                component="button"
                onClick={() => { navigate('/phrases'); toggleDrawer(); }}
                sx={buttonStyle}
              >
                <ListItemText primary="My Phrases" />
              </ListItem>

              {/* Practice button */}
              <ListItem
                component="button"
                onClick={() => { navigate('/practice'); toggleDrawer(); }}
                sx={buttonStyle}
              >
                <ListItemText primary="Practice" />
              </ListItem>

              {/* Conversation selector in button style */}
              <ListItem sx={{
                            width: '100%',
                            padding: '30px 0px',
                          }}>
                <Select
                  value={selectedConversation}
                  onChange={handleConversationChange}
                  displayEmpty
                  fullWidth
                  sx={{
                    ...buttonStyle,  // Applying button styles to the Select
                    color: 'white',
                    backgroundColor: '#282828',
                    borderRadius: '8px',
                    '& .MuiSelect-icon': { color: 'white' },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select a Conversation
                  </MenuItem>
                  {availableConversations.map(({ id, title }) => (
                    <MenuItem key={id} value={id}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </ListItem>
            </>
          )}

          {/* Login button if not logged in */}
          {!isLoggedIn && location.pathname !== '/' && (
            <ListItem
              component="button"
              onClick={() => { navigate('/'); toggleDrawer(); }}
              sx={buttonStyle}
            >
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}

export default NavigationPanel;
