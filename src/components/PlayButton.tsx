import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface PlayButtonProps {
  index: number;
  filePrefix: string;
  token: string;
  speaker: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ index, filePrefix, token, speaker }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Function to fetch the signed URL from the backend
  const fetchSignedUrl = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_EC_MAIN_APP_API_BASE_URL}/audio/signed-url/${filePrefix}/${speaker}_audio_${filePrefix}_${index + 1}.mp3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch signed URL');
      }

      const signedUrl = await response.text(); // The signed URL is returned as plain text
      return signedUrl;
    } catch (error) {
      console.error('Error fetching signed URL:', error);
      return null;
    }
  };

  // Handle audio playback
  const handlePlayAudio = async () => {
    const signedUrl = await fetchSignedUrl();
    if (signedUrl) {
      // Stop any previous audio if it exists
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      const newAudio = new Audio(signedUrl); // Create a new audio object with the signed URL
      setAudio(newAudio);
      newAudio.play(); // Play the audio
    }

    console.log(`Playing audio for line ${index + 1}, file prefix: ${filePrefix}`);
  };

  // Cleanup effect to stop the audio when the component is unmounted or conversation changes
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause(); // Pause the audio
        audio.currentTime = 0; // Reset to start
      }
    };
  }, [audio, filePrefix, index]); // Reset audio if filePrefix or index changes

  return (
    <Box
      sx={{
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(128, 255, 128, 0.1)', // Light, semi-transparent green
        borderRadius: '50%',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Softer shadow
        cursor: 'pointer',
        opacity: 0.5,
        '&:hover': {
          opacity: 0.8,
        },
        transition: 'opacity 0.3s',
      }}
      onClick={handlePlayAudio}
    >
      <PlayArrowIcon
        sx={{
          fontSize: '3rem', // Size of the play icon
          color: '#fff',
          filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.6))', // 3D effect
        }}
      />
    </Box>
  );
};

export default PlayButton;
