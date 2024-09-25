import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

function Login({ onLogin, errorMessage, setErrorMessage }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = { email, password };

    try {
      const response = await fetch('https://ec-auth-53ee47810f36.herokuapp.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);
        console.log('You have been logged in');
        onLogin();
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
        console.error('Login failed:', errorText);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred.');
    }
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
          Login
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            Login
          </Button>

          {errorMessage && (
            <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
