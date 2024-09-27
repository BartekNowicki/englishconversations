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
  Box
} from '@mui/material';
import { Learnable } from '../types';
import { useLearnables } from '../hooks/useLearnables';

interface LearnablesTableProps {
  token: string;
}

const LearnablesTable: React.FC<LearnablesTableProps> = ({ token }) => {
  const { learnables, loading, error } = useLearnables(token);
  const [selectedLearnable, setSelectedLearnable] = useState<Learnable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [phrase, setPhrase] = useState('');
  const [translation, setTranslation] = useState('');
  const [comment, setComment] = useState('');
  const [retention, setRetention] = useState<number>(0);

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
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:8080/learnables/${selectedLearnable?.id}`
      : 'http://localhost:8080/learnables';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(learnableData),
      });

      if (response.ok) {
        alert(isEditing ? 'Learnable updated successfully' : 'Learnable created successfully');
        window.location.reload(); // Reload the page to reflect changes
      } else {
        alert(`Failed to ${isEditing ? 'update' : 'create'} learnable`);
      }
    } catch (error) {
      console.error(`Error during ${isEditing ? 'update' : 'create'}:`, error);
    }

    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this learnable?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8080/learnables/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('Learnable deleted successfully');
          window.location.reload(); // Reload the page to reflect changes
        } else {
          alert('Failed to delete learnable');
        }
      } catch (error) {
        console.error('Error deleting learnable:', error);
      }
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddNew} sx={{ marginBottom: 2 }}>
        Add New
      </Button>

      <TableContainer component={Paper} sx={{ backgroundColor: '#1c1c1c', color: '#fff' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff', width: '25%' }}>Phrase</TableCell>
              <TableCell align="right" sx={{ color: '#fff', width: '25%' }}>Translation</TableCell>
              <TableCell align="right" sx={{ color: '#fff', width: '25%' }}>Comment</TableCell>
              <TableCell align="right" sx={{ color: '#fff' }}>Retention</TableCell>
              <TableCell align="right" sx={{ color: '#fff' }}>Actions</TableCell>
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
                <TableRow key={learnable.id} sx={{ backgroundColor: '#2a2a2a', '& td': { whiteSpace: 'normal', wordWrap: 'break-word' } }}>
                  <TableCell sx={{ color: '#fff' }}>{learnable.phrase}</TableCell>
                  <TableCell align="right" sx={{ color: '#fff' }}>{learnable.translation}</TableCell>
                  <TableCell align="right" sx={{ color: '#fff' }}>{learnable.comment}</TableCell>
                  <TableCell align="right" sx={{ color: '#fff' }}>{learnable.retention}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(learnable)}
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(learnable.id)}
                      >
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
        <DialogTitle sx={{ backgroundColor: '#1c1c1c', color: '#fff' }}>
          {isEditing ? 'Edit Learnable' : 'Add New Learnable'}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1c1c1c', color: '#fff' }}>
          <TextField
            label="Phrase"
            fullWidth
            margin="dense"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{ input: { color: '#fff' } }}
          />
          <TextField
            label="Translation"
            fullWidth
            margin="dense"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{ input: { color: '#fff' } }}
          />
          <TextField
            label="Comment"
            fullWidth
            margin="dense"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{ input: { color: '#fff' } }}
          />
          <TextField
            label="Retention"
            fullWidth
            margin="dense"
            type="number"
            value={retention}
            onChange={(e) => setRetention(parseInt(e.target.value, 10))}
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{ input: { color: '#fff' } }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1c1c1c' }}>
          <Button onClick={handleCloseModal} sx={{ color: '#fff' }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {isEditing ? 'Save Changes' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LearnablesTable;
