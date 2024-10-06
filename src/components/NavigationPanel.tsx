import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Select, MenuItem, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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
  const [availableConversations, setAvailableConversations] = useState<{ id: string; title: string }[]>([]); // Fixed type for conversation array
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const loadConversations = () => {
      const filenames = Object.keys(conversationModules);

      // Parse filenames into titles like "1a Passing of Time" and "1b Passing of Time"
      const conversations = filenames.map((filePath) => {
        const filename = filePath.split('/').pop()?.replace('.ts', '');
        if (filename) {
          const [number, ...titleParts] = filename.split('_');
          const title = titleParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Capitalize title
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
      onLogout(); // Call the logout function from App to update state
      navigate('/'); // Navigate after logging out
      console.log("logged out at the nav panel");
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
              <ListItem sx={{ cursor: 'pointer' }} onClick={() => { handleLogoutClick(); toggleDrawer(); }}>
                <ListItemText primary="Logout" />
              </ListItem>
              <ListItem sx={{ cursor: 'pointer' }} onClick={() => { navigate('/phrases'); toggleDrawer(); }}>
                <ListItemText primary="My Phrases" />
              </ListItem>

              {/* Link to Practice Page */}
              <ListItem sx={{ cursor: 'pointer' }} onClick={() => { navigate('/practice'); toggleDrawer(); }}>
                <ListItemText primary="Practice" />
              </ListItem>

              {/* Conversation Header with Consistent Style */}
              <ListItem>
                <ListItemText primary="Conversations" />
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
                  {availableConversations.map(({ id, title }) => (
                    <MenuItem key={id} value={id}>
                      {title}
                    </MenuItem>
                  ))}
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
