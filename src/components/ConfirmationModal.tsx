import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  items?: string[];
  hideButtons?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  items = [],
  hideButtons = false,
}) => {
  return (
    <Dialog open={open}
    onClose={onClose}
    PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: '#141414',
          boxShadow: 'none',
        },
      }}>
      <DialogTitle sx={{ color: '#fff', backgroundColor: '#141414', padding: '50px 60px 30px 60px' }}>{title}</DialogTitle>
      <DialogContent sx={{ backgroundColor: '#141414', color: '#fff'}}>

        {items.length > 0 && (
          <ul style={{ padding: '0', listStyle: 'none' }}>
                      {items.map((item, index) => (
                        <li
                          key={index}
                          style={{
                            marginBottom: '10px',
                            fontSize: '1rem',
                            padding: '5px 0',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            fontFamily: 'Roboto Condensed, Arial, sans-serif'
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
        )}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#141414' }}>
        {hideButtons ? (
          <Button
            onClick={onClose}
            variant="contained"
            color="success"
            sx={{ color: '#fff' }}
          >
            OK
          </Button>
        ) : (
          <>
            <Button onClick={onClose} variant="outlined" sx={{ color: '#fff', borderColor: '#fff' }}>
              Cancel
            </Button>
            <Button onClick={onConfirm} variant="contained" color="error">
              Confirm
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
