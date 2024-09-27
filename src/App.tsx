import { Box } from '@mui/material';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationPanel from './components/NavigationPanel';
import Conversation from './components/Conversation';
import Login from './components/Login';
import Phrases from './components/Phrases';
import { useState, useEffect } from 'react';
import { useLearnables } from './hooks/useLearnables';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const handleLogin = () => {
    const storedToken = localStorage.getItem('token');
    setIsLoggedIn(true);
    setToken(storedToken);
    setErrorMessage('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken(null);
  };

  // Use the custom hook to fetch learnables if the token is available
  const { learnables, loading, error } = useLearnables(token || '');

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000' }}>
        {/* Navigation Panel */}
        {isLoggedIn && (
          <NavigationPanel
            onConversationSelect={(id: string) => console.log(`Selected: ${id}`)}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            errorMessage={errorMessage}
          />
        )}

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}
        >
          {/* Central Pane */}
          <Box
            sx={{
              width: '90%',
              maxWidth: 1200,
              padding: '0px',
              backgroundColor: '#333',
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/phrases" />
                  ) : (
                    <Login
                      onLogin={handleLogin}
                      errorMessage={errorMessage}
                      setErrorMessage={setErrorMessage}
                    />
                  )
                }
              />
              <Route
                path="/phrases"
                element={isLoggedIn ? (
                  <Phrases learnables={learnables} loading={loading} error={error} />
                ) : (
                  <Navigate to="/" />
                )}
              />
              <Route
                path="/:id"
                element={isLoggedIn ? <Conversation /> : <Navigate to="/" />}
              />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
