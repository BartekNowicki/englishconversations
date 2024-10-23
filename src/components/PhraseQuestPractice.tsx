import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ConversationSelection from './ConversationSelection'; // Your working selection component
import { loadConversationById } from '../utils/loadConversation'; // Function to load conversations by ID

const PhraseQuestPractice: React.FC = () => {
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);

  const handleStartPractice = async (selectedIds: string[]) => {
    setSelectedConversations(selectedIds);

    // Load multiple conversations using the same logic as for single conversations
    const loadedConversations = await Promise.all(
      selectedIds.map(async (id) => {
        try {
          const conversation = await loadConversationById(id);
          return { id, ...conversation };
        } catch (error) {
          console.error(`Error loading conversation for ID ${id}:`, error);
          return null;
        }
      })
    );

    // Log the phrases from each loaded conversation along with the source file
    loadedConversations.forEach(conversation => {
      if (conversation) {
        console.log(`Phrases from ${conversation.id}:`, conversation.clickables);
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141414',
        width: '100%',
      }}
    >
      {/* Use the working ConversationSelection component to allow multiple selections */}
      <ConversationSelection onStartPractice={handleStartPractice} />

      {/* Placeholder button to start the practice session */}
      <Button onClick={() => handleStartPractice(selectedConversations)} sx={{ marginTop: '20px', color: '#000', backgroundColor: '#fff' }}>
        Start PhraseQuest Practice
      </Button>
    </Box>
  );
};

export default PhraseQuestPractice;
