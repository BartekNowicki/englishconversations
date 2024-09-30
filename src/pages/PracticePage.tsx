import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClickableBox from '../components/ClickableBox';
import prepositionsImage from '../assets/images/prepositions.jpg'; // Import the image

const PracticePage = () => {
  const navigate = useNavigate();

  const handlePrepositionsClick = () => {
    navigate('/practice/1');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '40px',
        backgroundColor: '#141414',
      }}
    >
      <ClickableBox
        imageSrc={prepositionsImage}
        title="Prepositions"
        onClick={handlePrepositionsClick}
      />
    </Box>
  );
};

export default PracticePage;
