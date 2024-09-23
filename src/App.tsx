import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Typography, Box, Select, MenuItem, Button } from '@mui/material';
import './App.css';

// Dynamically load all conversation files in the "assets/conversations" folder
const conversationModules = import.meta.glob('./assets/conversations/*.ts');

interface ConversationModule {
  [key: string]: any;
  clickables: string[];
  title: string;
}

function Conversation() {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [conversation, setConversation] = useState<any[]>([]);
  const [clickables, setClickables] = useState<string[]>([]);
  const [clicked, setClicked] = useState<string[]>([]);

  useEffect(() => {
    const loadConversation = async () => {
      const filePath = `./assets/conversations/conversation${id}.ts`;

      if (conversationModules[filePath]) {
        try {
          const module = (await conversationModules[filePath]()) as ConversationModule;
          setConversation(module[`conversation${id}`]);
          setClickables(module.clickables);
          setTitle(module.title);
        } catch (error) {
          console.error('Error loading conversation:', error);
        }
      } else {
        console.error('No conversation found for this ID');
      }
    };

    loadConversation();
  }, [id]);

  const handleClick = (phrase: string) => {
    setClicked(prev =>
      prev.includes(phrase)
        ? prev.filter(p => p !== phrase)
        : [...prev, phrase]
    );
  };

  const renderTextWithClickables = (text: string) => {
    const parts = text.split(new RegExp(`(${clickables.join("|")})`, "g"));
    return parts.map((part, index) =>
      clickables.includes(part) ? (
        <span
          key={index}
          onClick={() => handleClick(part)}
          className={`clickable ${clicked.includes(part) ? 'clicked' : ''}`}
        >
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <Box>
      <Typography variant="h2">{title}</Typography>
      {conversation.length > 0 ? (
        conversation.map((dialog, index) => (
          <Typography key={index} className="dialog-line">
            <strong>{dialog.speaker}:</strong> {renderTextWithClickables(dialog.text)}
          </Typography>
        ))
      ) : (
        <Typography>Loading conversation...</Typography>
      )}
    </Box>
  );
}

function Login() {
  return (
    <Box>
      <Typography variant="h4">Login</Typography>
      <Typography>Login form would go here...</Typography>
    </Box>
  );
}

function Phrases() {
  const mockPhrases = ['Hello World', 'Good morning', 'How are you?'];
  return (
    <Box>
      <Typography variant="h4">My Phrases</Typography>
      <List>
        {mockPhrases.map((phrase, index) => (
          <ListItem key={index}>
            <ListItemText primary={phrase} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function NavigationPanel({ onConversationSelect }: { onConversationSelect: (id: string) => void }) {
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
        <ListItem button onClick={() => navigate('/')}>
          <ListItemText primary="Login" />
        </ListItem>

        <ListItem button onClick={() => navigate('/phrases')}>
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

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <NavigationPanel onConversationSelect={(id) => console.log(`Selected: ${id}`)} />

        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/phrases" element={<Phrases />} />
            <Route path="/:id" element={<Conversation />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
