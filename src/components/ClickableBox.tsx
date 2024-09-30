import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

interface ClickableBoxProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
}

const ClickableBox: React.FC<ClickableBoxProps> = ({ imageSrc, title, onClick }) => {
  return (
    <Card
      sx={{
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        margin: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="200" image={imageSrc} alt={title} />
        <CardContent>
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', fontWeight: 'bold', color: '#fff' }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClickableBox;