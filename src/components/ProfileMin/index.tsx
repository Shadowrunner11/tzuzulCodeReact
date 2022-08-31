import { Avatar, Menu, MenuItem } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { AuthContext } from '../../pages/MainRouter';

type Props = {
  children?: JSX.Element | string | null,
};


const ProfileMin = ({children}: Props)=>{
  const { classes } = useStyles();

  const navigate = useNavigate();

  const { sessionAuth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const _handleClose = () => {
    setAnchorEl(null);
  };

  const _handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleLogOut = () => {
    _handleClose();
    sessionAuth();
    navigate('/');
  };

  return (
    <>
      <div onClick={_handleClick}>
        <Avatar className={classes.avatar}>
          {children}
        </Avatar>
      </div>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorEl={anchorEl}
        id="basic-menu"
        onClose={_handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={_handleClose}>Perfil</MenuItem>
        <MenuItem onClick={_handleClose}>Configuracion</MenuItem>
        <MenuItem onClick={_handleLogOut}>Logout</MenuItem>
      </Menu>
    </>
  );
};

const random = ()=>Math.round(Math.random()*255);

const useStyles = makeStyles({name: 'Avatar'})(()=>({
  avatar:{
    ':hover':{
      cursor: 'pointer'
    },
    backgroundColor: `rgb(${random()},${random()},${random()})`
  }
}));

export default ProfileMin;