import { Select, MenuItem, FormControl } from '@mui/material';

const prepositions = [
  "in", "on", "at", "by", "for", "with", "about", "into", "through", "between", "against",
  "during", "without", "within", "among", "to", "from", "over", "under", "around", "behind", "above", "below"
];

interface PrepositionSelectProps {
  value: string;
  onChange: (event: any) => void;
}

export const PrepositionSelect: React.FC<PrepositionSelectProps> = ({ value, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        value={value}
        onChange={onChange}
        sx={{
          color: 'white', // Text color for the select field itself
          '& .MuiSelect-icon': {
            color: 'white', // Icon color for the dropdown arrow
          },
          '& .MuiMenuItem-root': {
            color: 'white', // Ensure all MenuItems start with white text
          },
          '& .Mui-selected': {
            color: 'white', // Ensure selected text is white
          },
          '& .MuiMenu-paper': {
            backgroundColor: 'black', // Ensure dropdown background is black
          },
        }}
      >
        {prepositions.map((prep, index) => (
          <MenuItem
            key={index}
            value={prep}
            sx={{
              color: 'white',
              backgroundColor: 'black',
              '&:hover': {
                border: '1px solid white',
                backgroundColor: 'black',
              },
              '&.Mui-selected': {
                color: 'white', // Ensure text stays white when selected
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Background when selected
              },
              '&.Mui-selected:hover': {
                color: 'white', // Keep text white on hover when selected
                border: '1px solid white',
                backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent background when hovered and selected
              },
            }}
          >
            {prep}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
