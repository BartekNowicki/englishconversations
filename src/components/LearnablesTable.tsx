import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Learnable } from '../types';
import { useLearnables } from '../hooks/useLearnables';
import { saveLearnable } from '../utils/saveLearnable';
import { deleteLearnable } from '../utils/deleteLearnable';
import ConfirmationModal from './ConfirmationModal';

const CellBorderBottomColor = 'rgba(128, 128, 128, 0.5)';
const newButtonColor = 'primary';
const editButtonColor = 'success';
const deleteButtonColor = 'error';

interface LearnablesTableProps {
  token: string;
}

const LearnablesTable: React.FC<LearnablesTableProps> = ({ token }) => {
  const { learnables, loading, error, fetchLearnables } = useLearnables(token);
  const [selectedLearnable, setSelectedLearnable] = useState<Learnable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [phrase, setPhrase] = useState('');
  const [translation, setTranslation] = useState('');
  const [comment, setComment] = useState('');
  const [retention, setRetention] = useState<number>(0);
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [learnableToDelete, setLearnableToDelete] = useState<Learnable | null>(null);

  const theme = useTheme();

  const handleEdit = (learnable: Learnable) => {
    setSelectedLearnable(learnable);
    setPhrase(learnable.phrase);
    setTranslation(learnable.translation);
    setComment(learnable.comment);
    setRetention(learnable.retention);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedLearnable(null);
    setPhrase('');
    setTranslation('');
    setComment('');
    setRetention(0);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLearnable(null);
  };

  const handleSave = async () => {
    const learnableData = { phrase, translation, comment, retention };

    try {
      await saveLearnable(learnableData, token, isEditing, selectedLearnable?.id);
      fetchLearnables();
      setConfirmationMessage(isEditing ? 'Phrase updated successfully!' : 'Phrase created successfully!');
    } catch (error) {
      console.error('Error during save:', error);
    }

    handleCloseModal();
  };

  const handleDeleteRequest = (learnable: Learnable) => {
    setLearnableToDelete(learnable);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (learnableToDelete) {
      try {
        await deleteLearnable(learnableToDelete.id, token);
        fetchLearnables(); // Update table without reload
        setConfirmationMessage(`Phrase "${learnableToDelete.phrase}" deleted successfully!`);
      } catch (error) {
        console.error('Error deleting phrase:', error);
      } finally {
        setShowDeleteModal(false);
        setLearnableToDelete(null);
      }
    }
  };

  return (
    <div>
      <Button variant="contained" color={newButtonColor} onClick={handleAddNew} sx={{ marginBottom: 2 }}>
        Add New
      </Button>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#141414',
          color: '#fff',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff', borderBottom: `2px solid ${CellBorderBottomColor}`, width: '25%' }}>Phrase</TableCell>
              <TableCell align="left" sx={{ color: '#fff', borderBottom: `2px solid ${CellBorderBottomColor}`, width: '25%' }}>Translation</TableCell>
              <TableCell align="left" sx={{ color: '#fff', borderBottom: `2px solid ${CellBorderBottomColor}`, width: '25%' }}>Comment</TableCell>
              <TableCell align="center" sx={{ color: '#fff', borderBottom: `2px solid ${CellBorderBottomColor}` }}>Retention</TableCell>
              <TableCell align="center" sx={{ color: '#fff', borderBottom: `2px solid ${CellBorderBottomColor}` }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="error">{error}</Typography>
                </TableCell>
              </TableRow>
            ) : learnables.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ color: '#fff' }}>
                  <Typography>No learnables found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              learnables.map((learnable) => (
                <TableRow
                  key={learnable.id}
                  sx={{
                    backgroundColor: '#1a1a1a',
                    '& td': { whiteSpace: 'normal', wordWrap: 'break-word' },
                  }}
                >
                  <TableCell sx={{ color: '#fff', borderBottom: `2px solid ${CellBorderBottomColor}`, textAlign: 'left' }}>{learnable.phrase}</TableCell>
                  <TableCell align="left" sx={{ color: '#fff', borderBottom: `2px solid ${CellBorderBottomColor}` }}>{learnable.translation}</TableCell>
                  <TableCell align="left" sx={{ color: '#fff', borderBottom: `2px solid ${CellBorderBottomColor}` }}>{learnable.comment}</TableCell>
                  <TableCell align="center" sx={{ color: '#fff', borderBottom: `2px solid ${CellBorderBottomColor}` }}>{learnable.retention}</TableCell>
                  <TableCell align="center" sx={{ borderBottom: `2px solid ${CellBorderBottomColor}` }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button variant="contained" color={editButtonColor} onClick={() => handleEdit(learnable)} sx={{ marginRight: 1 }}>
                        Edit
                      </Button>
                      <Button variant="contained" color={deleteButtonColor} onClick={() => handleDeleteRequest(learnable)}>
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Adding/Editing Learnable */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle sx={{ backgroundColor: isEditing ? theme.palette.success.main : theme.palette.primary.main, color: '#fff' }}>
          {isEditing ? 'Edit Phrase' : 'Add New Phrase'}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#141414', color: '#fff' }}>
          <TextField
            label="Phrase"
            fullWidth
            margin="dense"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{ input: { color: '#fff' }, marginTop: '50px' }}
          />
          <TextField
            label="Translation"
            fullWidth
            margin="dense"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{ input: { color: '#fff' }, marginTop: '50px'  }}
          />
          <TextField
            label="Comment"
            fullWidth
            margin="dense"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{ input: { color: '#fff' }, marginTop: '50px'  }}
          />
          <TextField
            label="Retention"
            fullWidth
            margin="dense"
            type="number"
            value={retention}
            onChange={(e) => setRetention(parseInt(e.target.value, 10))}
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{ input: { color: '#fff' }, marginTop: '50px'  }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#141414' }}>
          <Button onClick={handleCloseModal} sx={{ color: '#fff' }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color={editButtonColor}>
            {isEditing ? 'Save Changes' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={!!confirmationMessage}
        onClose={() => setConfirmationMessage('')}
        onConfirm={() => setConfirmationMessage('')}
        title={confirmationMessage}
        isMessage={true}
      />

      {learnableToDelete && (
        <ConfirmationModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          title={`Are you sure you want to delete "${learnableToDelete.phrase}"?`}
          items={[]}
        />
      )}
    </div>
  );
};

export default LearnablesTable;
