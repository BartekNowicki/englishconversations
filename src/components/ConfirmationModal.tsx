import React from 'react';
import { Box, Typography, Button, Modal, Paper } from '@mui/material';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  items: string[];
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  items,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          width: '400px',
          padding: '20px',
          margin: 'auto',
          marginTop: '100px',
          backgroundColor: '#1c1c1c',
          color: '#fff',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          {title}
        </Typography>

        {items.length > 0 && (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <Typography>{item}</Typography>
              </li>
            ))}
          </ul>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button onClick={onClose} sx={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ConfirmationModal;
