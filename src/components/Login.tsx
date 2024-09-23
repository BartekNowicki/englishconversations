import { Box, Button, TextField, Typography, Paper } from '@mui/material';

function Login() {
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
          backgroundColor: '#1c1c1c', // Dark gray background for the form
          borderRadius: '10px',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#f5f5f5' }} // Light gray text for title
        >
          Login
        </Typography>

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            InputLabelProps={{ style: { color: '#ccc' } }} // Light gray label
            sx={{
              backgroundColor: '#333', // Medium gray input background
              input: { color: '#fff' }, // White text inside inputs
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#555', // Dark gray border
                },
                '&:hover fieldset': {
                  borderColor: '#777', // Lighter gray on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff', // White when focused
                },
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            InputLabelProps={{ style: { color: '#ccc' } }} // Light gray label
            sx={{
              backgroundColor: '#333', // Medium gray input background
              input: { color: '#fff' }, // White text inside inputs
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#555', // Dark gray border
                },
                '&:hover fieldset': {
                  borderColor: '#777', // Lighter gray on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff', // White when focused
                },
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              marginTop: '20px',
              backgroundColor: '#555', // Dark gray button
              '&:hover': {
                backgroundColor: '#777', // Lighter gray on hover
              },
            }}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
