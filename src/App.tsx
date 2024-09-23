import { Box } from '@mui/material';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationPanel from './components/NavigationPanel';
import Conversation from './components/Conversation';
import Login from './components/Login';
import Phrases from './components/Phrases';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <NavigationPanel onConversationSelect={(id) => console.log(`Selected: ${id}`)} />
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'black',
          }}
        >
          <Box
            sx={{
              width: '60%',
              maxWidth: 800,
              padding: '0px',
              backgroundColor: '#DCEDC8',
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/phrases" element={<Phrases />} />
              <Route path="/:id" element={<Conversation />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
