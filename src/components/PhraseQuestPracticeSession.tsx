// import { useEffect, useState } from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
//
// interface PhraseQuestSessionProps {
//   selectedSources: {
//     id: string;
//     title: string;
//     clickables: string[];
//   }[];
// }
//
// const PhraseQuestSession: React.FC<PhraseQuestSessionProps> = ({ selectedSources }) => {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     // Log all phrases grouped by their sources to the console
//     selectedSources.forEach(source => {
//       console.log(`Phrases from: ${source.title}`);
//       source.clickables.forEach(phrase => console.log(phrase));
//     });
//   }, [selectedSources]);
//
//   const handleNext = () => {
//     if (currentIndex < selectedSources.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       console.log('All phrases have been logged');
//     }
//   };
//
//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#141414',
//         padding: '20px',
//         position: 'relative',
//       }}
//     >
//       <Typography variant="h4" sx={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>
//         Practice begins
//       </Typography>
//
//       <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>
//         You are practicing with phrases from {selectedSources[currentIndex].title}
//       </Typography>
//
//       <Button
//         variant="contained"
//         onClick={handleNext}
//         sx={{ backgroundColor: '#00e676', color: '#000' }}
//         disabled={currentIndex >= selectedSources.length - 1}
//       >
//         Next Source
//       </Button>
//
//       <Button
//         variant="contained"
//         onClick={() => {
//           navigate('/practice/phrasequest');
//           window.location.reload();  // Force page reload after navigation; needed for gh pages only
//         }}
//         sx={{ backgroundColor: '#ff4d4d', color: '#fff', marginTop: '20px' }}
//       >
//         End Session
//       </Button>
//     </Box>
//   );
// };
//
// export default PhraseQuestSession;
