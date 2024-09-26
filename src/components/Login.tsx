import { Box, Button, TextField, Typography, Paper, Link } from '@mui/material';
import { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

function Login({ onLogin, errorMessage, setErrorMessage }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleLoginOrRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = mode === 'login' ? { email, password } : { email, password, username: username };

    const url = mode === 'login'
      ? 'https://ec-auth-53ee47810f36.herokuapp.com/auth/login'
      : 'https://ec-auth-53ee47810f36.herokuapp.com/auth/register';

//     const url = mode === 'login'
//       ? 'http://localhost:8080/auth/login'
//       : 'http://localhost:8080/auth/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const token = await response.text();

        localStorage.setItem('token', token);
        console.log(`You have been ${mode === 'login' ? 'logged in' : 'registered and logged in'}`);
        onLogin();
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
        console.error(`${mode === 'login' ? 'Login' : 'Registration'} failed:`, errorText);
      }
    } catch (error) {
      console.error('Error during login/registration:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'login' ? 'register' : 'login'));
    setErrorMessage('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#1c1c1c',
          borderRadius: '10px',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#f5f5f5' }}>
          {mode === 'login' ? 'Login' : 'Register'}
        </Typography>

        <Box component="form" onSubmit={handleLoginOrRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mode === 'register' && (
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{ style: { color: '#ccc' } }}
              sx={{
                backgroundColor: '#333',
                input: { color: '#fff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#555' },
                  '&:hover fieldset': { borderColor: '#777' },
                  '&.Mui-focused fieldset': { borderColor: '#fff' },
                },
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            InputLabelProps={{ style: { color: '#ccc' } }}
            sx={{
              backgroundColor: '#333',
              input: { color: '#fff' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#555' },
                '&:hover fieldset': { borderColor: '#777' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            InputLabelProps={{ style: { color: '#ccc' } }}
            sx={{
              backgroundColor: '#333',
              input: { color: '#fff' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#555' },
                '&:hover fieldset': { borderColor: '#777' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              marginTop: '20px',
              backgroundColor: '#555',
              '&:hover': { backgroundColor: '#777' },
            }}
            type="submit"
            fullWidth
          >
            {mode === 'login' ? 'Login' : 'Register'}
          </Button>

          {errorMessage && (
            <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Typography variant="body2" align="center" sx={{ color: '#ccc', marginTop: 2 }}>
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <Link
              component="button"
              variant="body2"
              onClick={toggleMode}
              sx={{ marginLeft: 1, color: '#fff', cursor: 'pointer' }}
            >
              {mode === 'login' ? 'Register' : 'Login'}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
