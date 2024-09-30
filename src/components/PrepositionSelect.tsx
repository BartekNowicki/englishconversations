import { Select, MenuItem, FormControl } from '@mui/material';

interface PrepositionSelectProps {
  value: string;
  onChange: (event: any) => void;
  wrongPrepositions: string[];
  correctPreposition: string;
  isCorrect?: boolean;
  isIncorrect?: boolean;
}

export const PrepositionSelect: React.FC<PrepositionSelectProps> = ({
  value,
  onChange,
  wrongPrepositions,
  correctPreposition,
  isCorrect,
  isIncorrect
}) => {
  const prepositionsToShow = [...wrongPrepositions, correctPreposition].sort();

  return (
    <FormControl
      sx={{
        minWidth: 80,
        borderColor: isIncorrect ? 'red' : isCorrect ? 'green' : 'transparent',
        borderWidth: isIncorrect || isCorrect ? '2px' : '0px',
        borderStyle: 'solid',
        borderRadius: '5px',
        marginLeft: '10px',
        marginRight: '10px',
      }}
    >
      <Select
        value={value}
        onChange={onChange}
        sx={{
          color: 'white',
          backgroundColor: 'black',
          '& .MuiSelect-icon': {
            color: 'white',
          },
          '& .MuiMenuItem-root': {
            color: 'white',
          },
          '& .Mui-selected': {
            color: 'white',
            border: '1px solid white',
            backgroundColor: 'black',
          },
          '& .MuiMenu-paper': {
            backgroundColor: 'black',
          },
        }}
    MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: 'black',
            '& .MuiList-root': {
              paddingTop: 0,
              paddingBottom: 0,
            },
          },
        },
      }}
    >
        {prepositionsToShow.map((prep, index) => (
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
                color: 'white',
                backgroundColor: 'black',
              },
              '&.Mui-selected:hover': {
                color: 'white',
                border: '1px solid white',
                backgroundColor: 'rgba(255, 255, 255, 0)',
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
