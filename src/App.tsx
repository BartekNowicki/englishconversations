import { Box } from '@mui/material';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationPanel from './components/NavigationPanel';
import Conversation from './components/Conversation';
import Login from './components/Login';
import Phrases from './components/Phrases';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Navigation Panel */}
        <NavigationPanel onConversationSelect={(id: string) => console.log(`Selected: ${id}`)} />

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black', // Keep the background black
          }}
        >
          {/* Central Pane */}
          <Box
            sx={{
              width: '60%',
              maxWidth: 800,
              padding: '0px',
              backgroundColor: '#DCEDC8', // Greenish background for the central pane
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
