import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';
import NavigationPanel from './components/NavigationPanel';
import Login from './components/Login';
import Phrases from './components/Phrases';
import Conversation from './components/Conversation';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        {/* Navigation Drawer */}
        <NavigationPanel />

        {/* Main Content */}
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
