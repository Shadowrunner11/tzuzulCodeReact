import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const SessionButtons = ()=>{
  return (
    <>
      <Button variant='contained'>
        <Link to="/singup">Singup</Link>
      </Button>
      <Button variant='outlined'>
        <Link to="/login">Login</Link>
      </Button>
    </>
  );
};

export default SessionButtons;