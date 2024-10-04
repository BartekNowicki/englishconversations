import { Box, CssBaseline } from '@mui/material';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationPanel from './components/NavigationPanel';
import ConversationPage from './pages/ConversationPage';
import Login from './components/Login';
import PhrasesPage from './pages/PhrasesPage';
import PracticePage from './pages/PracticePage';
import PrepositionPractice from './components/PrepositionPractice';
import FlashCardPractice from './components/FlashCardPractice';
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
    }, [isLoggedIn, token]);


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

  const { learnables, loading, error, fetchLearnables } = useLearnables(token || '');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000' }}>
          {/* Navigation Panel visible when logged in */}
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
                {/* Default route to phrases if logged in, else login */}
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

                {/* Phrases Page */}
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

                {/* Conversation Page with dynamic ID */}
                <Route
                  path="/conversation/:id"
                  element={
                    isLoggedIn ? (<ConversationPage token={token || ''} fetchLearnables={fetchLearnables}/>) : (<Navigate to="/" />)
                  }
                />

                {/* Practice Page */}
                <Route
                  path="/practice"
                  element={ isLoggedIn ? (<PracticePage />) : (<Navigate to="/" />)
                  }
                />
                <Route path="/practice/1" element={isLoggedIn ? <PrepositionPractice /> : <Navigate to="/" />} />
                <Route path="/practice/flashcards" element={<FlashCardPractice learnables={learnables} loading={loading} error={error} fetchLearnables={fetchLearnables}/>} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
