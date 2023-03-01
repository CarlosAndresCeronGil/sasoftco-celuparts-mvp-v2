import { DialogActions } from '@mui/material';
import { Button } from 'reactstrap';

// eslint-disable-next-line react/prop-types
const MyActionBar = ({ onClear }) => {
  return (
    <DialogActions>
      <Button onClick={onClear}> Limpiar </Button>
    </DialogActions>
  );
};

export default MyActionBar;
