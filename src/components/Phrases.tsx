import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

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

export default Phrases;
