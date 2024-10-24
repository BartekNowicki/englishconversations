
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ConversationSelection from './ConversationSelection';
import { loadConversationById } from '../utils/loadConversation';
import PhraseQuestPracticeSession from './PhraseQuestPracticeSession';

interface ClickableDistractor {
  phrase: string;
  distractors: string[];
}

interface PhraseQuestPracticeProps {
  token: string;
  userLearnables: Learnable[];
}


const PhraseQuestPractice: React.FC<PhraseQuestPracticeProps> = ({ token, userLearnables }) => {
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);
  const [clickables, setClickables] = useState<string[]>([]);
  const [clickableDistractors, setClickableDistractors] = useState<ClickableDistractor[]>([]);

  const handleStartPractice = async (selectedIds: string[]) => {
    setSelectedConversations(selectedIds);
    let allClickables: string[] = [];
    let allClickableDistractors: ClickableDistractor[] = [];

    if (selectedIds.length === 1) {
      try {
        const conversation = await loadConversationById(selectedIds[0]);
        if (conversation) {
          allClickables = conversation.clickables;
          allClickableDistractors = conversation.clickablesDistractors;
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
          allClickableDistractors = [...allClickableDistractors, ...conversation.clickableDistractors];
        }
      });
    }

    setClickables(allClickables);
    setClickableDistractors(allClickableDistractors);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#141414', width: '100%' }}>
      {!clickables.length && <ConversationSelection onStartPractice={handleStartPractice} multipleSelection={true} />}
      {!!clickables.length && <PhraseQuestPracticeSession token={token}clickables={clickables} clickableDistractors={clickableDistractors} userLearnables={userLearnables}/>}
    </Box>
  );
};

export default PhraseQuestPractice;
