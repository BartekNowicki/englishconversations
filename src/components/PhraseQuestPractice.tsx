// PhraseQuestPractice.tsx

import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ConversationSelection from './ConversationSelection';
import { loadConversationById } from '../utils/loadConversation';
import PhraseQuestPracticeSession from './PhraseQuestPracticeSession';

const PhraseQuestPractice: React.FC = () => {
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);
  const [clickables, setClickables] = useState<string[]>([]);

  const handleStartPractice = async (selectedIds: string[]) => {
    setSelectedConversations(selectedIds);
    let allClickables: string[] = [];

    if (selectedIds.length === 1) {
      try {
        const conversation = await loadConversationById(selectedIds[0]);
        if (conversation) {
          allClickables = conversation.clickables;
        }
      } catch (error) {
        console.error(`Error loading conversation for ID ${selectedIds[0]}:`, error);
      }
    } else {
      const loadedConversations = await Promise.all(
        selectedIds.map(async (id) => {
          try {
            const conversation = await loadConversationById(id);
            return conversation;
          } catch (error) {
            console.error(`Error loading conversation for ID ${id}:`, error);
            return null;
          }
        })
      );

      loadedConversations.forEach(conversation => {
        if (conversation && conversation.clickables) {
          allClickables = [...allClickables, ...conversation.clickables];
        }
      });
    }

    setClickables(allClickables);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#141414', width: '100%' }}>
      {!clickables.length && <ConversationSelection onStartPractice={handleStartPractice} multipleSelection={true} />}
      {!!clickables.length && <PhraseQuestPracticeSession learnables={clickables} />}
    </Box>
  );
};

export default PhraseQuestPractice;
