import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
  Button,
  TableSortLabel
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface Phrase {
  id: number;
  phrase: string;
  translation: string;
  comment: string;
  retention: string;
}

const initialPhrases: Phrase[] = [
  { id: 1, phrase: 'I would like some coffee', translation: 'Me gustaría un café', comment: 'Request', retention: 'High' },
  { id: 2, phrase: 'Where is the nearest store?', translation: '¿Dónde está la tienda más cercana?', comment: 'Question', retention: 'Medium' },
  { id: 3, phrase: 'Can you help me please?', translation: '¿Puedes ayudarme por favor?', comment: 'Request for help', retention: 'High' },
  { id: 4, phrase: 'The weather is really nice', translation: 'El clima es muy agradable', comment: 'Small talk', retention: 'Medium' },
  { id: 5, phrase: 'I will see you tomorrow', translation: 'Te veré mañana', comment: 'Future arrangement', retention: 'Low' },
  { id: 6, phrase: 'What time is it now?', translation: '¿Qué hora es ahora?', comment: 'Question', retention: 'High' },
  { id: 7, phrase: 'Could you give me directions?', translation: '¿Podrías darme direcciones?', comment: 'Asking for help', retention: 'Medium' },
  { id: 8, phrase: 'This is a great opportunity', translation: 'Esta es una gran oportunidad', comment: 'Positive statement', retention: 'High' },
  { id: 9, phrase: 'She likes to read books', translation: 'A ella le gusta leer libros', comment: 'General statement', retention: 'Medium' },
  { id: 10, phrase: 'We are going to eat dinner', translation: 'Vamos a cenar', comment: 'Future plan', retention: 'Low' },
  { id: 11, phrase: 'Do you want some water?', translation: '¿Quieres un poco de agua?', comment: 'Offer', retention: 'High' },
  { id: 12, phrase: 'I am looking for work', translation: 'Estoy buscando trabajo', comment: 'Job search', retention: 'Medium' },
  { id: 13, phrase: 'The dog is very friendly', translation: 'El perro es muy amigable', comment: 'Description', retention: 'High' },
  { id: 14, phrase: 'I can’t find my keys', translation: 'No puedo encontrar mis llaves', comment: 'Problem', retention: 'Medium' },
  { id: 15, phrase: 'The meeting starts at noon', translation: 'La reunión comienza al mediodía', comment: 'Schedule', retention: 'Low' },
  { id: 16, phrase: 'I need a little break', translation: 'Necesito un pequeño descanso', comment: 'Resting', retention: 'High' },
  { id: 17, phrase: 'She went to the movies', translation: 'Ella fue al cine', comment: 'Past event', retention: 'Medium' },
  { id: 18, phrase: 'How much does this cost?', translation: '¿Cuánto cuesta esto?', comment: 'Shopping', retention: 'High' },
  { id: 19, phrase: 'We are traveling next week', translation: 'Viajaremos la próxima semana', comment: 'Future event', retention: 'Low' },
  { id: 20, phrase: 'He enjoys playing the guitar', translation: 'Disfruta tocar la guitarra', comment: 'Hobby', retention: 'Medium' }
];

function MyPhrases() {
  const [phrases, setPhrases] = useState<Phrase[]>(initialPhrases);
  const [editId, setEditId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<keyof Phrase>('phrase');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleDelete = (id: number) => {
    setPhrases((prev) => prev.filter((phrase) => phrase.id !== id));
  };

  const handleEdit = (id: number) => {
    setEditId(id);
  };

  const handleSave = () => {
    setEditId(null);
  };

  const handleSort = (property: keyof Phrase) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(property);

    const sortedPhrases = [...phrases].sort((a, b) => {
      if (a[property] < b[property]) {
        return isAsc ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
    setPhrases(sortedPhrases);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#121212', borderRadius: 2, color: 'white' }}>
      <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>
                <TableSortLabel
                  active={sortBy === 'phrase'}
                  direction={sortDirection}
                  onClick={() => handleSort('phrase')}
                  sx={{
                    color: 'white',
                    '&:hover': {
                      color: 'white !important',
                    },
                    '&.Mui-active': {
                      color: 'white',
                    },
                    '& .MuiTableSortLabel-icon': {
                      color: 'white !important',
                    },
                  }}
                >
                  Phrase
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'white' }}>
                <TableSortLabel
                  active={sortBy === 'translation'}
                  direction={sortDirection}
                  onClick={() => handleSort('translation')}
                  sx={{
                    color: 'white',
                    '&:hover': {
                      color: 'white !important',
                    },
                    '&.Mui-active': {
                      color: 'white',
                    },
                    '& .MuiTableSortLabel-icon': {
                      color: 'white !important',
                    },
                  }}
                >
                  Translation
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'gray' }}>Comment</TableCell>
              <TableCell sx={{ color: 'gray' }}>Retention</TableCell>
              <TableCell sx={{ color: 'gray' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phrases.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ color: 'white' }}>
                  {editId === row.id ? (
                    <TextField
                      defaultValue={row.phrase}
                      fullWidth
                      InputProps={{
                        style: { color: 'white', border: '1px solid white' }
                      }}
                    />
                  ) : (
                    row.phrase
                  )}
                </TableCell>
                <TableCell sx={{ color: 'white' }}>
                  {editId === row.id ? (
                    <TextField
                      defaultValue={row.translation}
                      fullWidth
                      InputProps={{
                        style: { color: 'white', border: '1px solid white' }
                      }}
                    />
                  ) : (
                    row.translation
                  )}
                </TableCell>
                <TableCell sx={{ color: 'white' }}>
                  {editId === row.id ? (
                    <TextField
                      defaultValue={row.comment}
                      fullWidth
                      InputProps={{
                        style: { color: 'white', border: '1px solid white' }
                      }}
                    />
                  ) : (
                    row.comment
                  )}
                </TableCell>
                <TableCell sx={{ color: 'white' }}>
                  {row.retention}
                </TableCell>
                <TableCell>
                  {editId === row.id ? (
                    <Button onClick={handleSave} variant="contained" color="primary">
                      Save
                    </Button>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(row.id)}>
                        <Edit sx={{ color: 'gray' }} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <Delete sx={{ color: 'gray' }} />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MyPhrases;
