
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ConversationSelection from './ConversationSelection';
import { loadConversationById } from '../utils/loadConversation';
import PhraseQuestPracticeSession from './PhraseQuestPracticeSession';

interface PhraseQuestPracticeSessionDistractor {
  phrase: string;
  distractors: string[];
}

const PhraseQuestPractice: React.FC = () => {
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);
  const [learnables, setLearnables] = useState<string[]>([]);
  const [learnableDistractors, setLearnableDistractors] = useState<PhraseQuestPracticeSessionDistractor[]>([]);

  const handleStartPractice = async (selectedIds: string[]) => {
    setSelectedConversations(selectedIds);
    let allLearnables: string[] = [];
    let allLearnableDistractors: PhraseQuestPracticeSessionDistractor[] = [];

    if (selectedIds.length === 1) {
      try {
        const conversation = await loadConversationById(selectedIds[0]);
        if (conversation) {
          allLearnables = conversation.clickables;
          allLearnableDistractors = conversation.clickablesDistractors;
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
          allLearnables = [...allLearnables, ...conversation.clickables];
          allLearnableDistractors = [...allLearnableDistractors, ...conversation.clickablesDistractors];
        }
      });
    }

    setLearnables(allLearnables);
    setLearnableDistractors(allLearnableDistractors);

  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#141414', width: '100%' }}>
      {!learnables.length && <ConversationSelection onStartPractice={handleStartPractice} multipleSelection={true} />}
      {!!learnables.length && <PhraseQuestPracticeSession learnables={learnables} learnableDistractors={learnableDistractors}/>}
    </Box>
  );
};

export default PhraseQuestPractice;
