import { Box, CssBaseline } from '@mui/material';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationPanel from './components/NavigationPanel';
import Conversation from './components/Conversation';
import Login from './components/Login';
import PhrasesPage from './pages/PhrasesPage';
import { useState, useEffect } from 'react';
import { useLearnables } from './hooks/useLearnables';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

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

  const { learnables, loading, error } = useLearnables(token || '');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000' }}>
          {isLoggedIn && (
            <NavigationPanel
              onConversationSelect={(id: string) => console.log(`Selected: ${id}`)}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              errorMessage={errorMessage}
            />
          )}

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
            <Box
              sx={{
                width: '90%',
                maxWidth: 1200,
                padding: '0px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                boxShadow: isLoggedIn ? '0 0 7px rgba(255, 255, 255, 0.3)' : 'none',
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
                  element={
                    isLoggedIn ? (
                      <PhrasesPage learnables={learnables} loading={loading} error={error} />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/:id"
                  element={isLoggedIn ? <Conversation token={token || ''} /> : <Navigate to="/" />}
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
