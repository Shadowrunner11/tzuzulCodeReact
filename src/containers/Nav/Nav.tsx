import clsx from 'clsx';
import { Box } from '@mui/material';
import { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { ColorModeContext } from '../../App';
import ReactIcon from '../../assets/react.svg';
import ModeSwitcher from '../../components/ModeSwitcher';
import { AuthContext } from '../../pages/MainRouter';
import RightSideNav from '../RightSideNav';

const Nav = ()=>{
  const { classes }  = useStyles();

  const mode = useContext(ColorModeContext);
  const session = useContext(AuthContext);

  return(
    <Box className={clsx(classes.root, classes.navBar)}>
      <img src={ReactIcon}/>
      <Box className={clsx(classes.root, classes.transparent)}>
        <Link className={classes.transparent} to="/">Home</Link>
        <Link className={classes.transparent} to="/calendar">Calendar demo</Link>
      </Box>
      <Box className={clsx(classes.root, classes.transparent)}>
        <ModeSwitcher onClick={mode.toogleMode}/>
        <RightSideNav session={session}/>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({name: 'NavBar'})(({palette,spacing})=>({
  navBar:{
    backgroundColor:palette.action.selected,
    left:0,
    minHeight: spacing(10),
    position: 'fixed',
    top: 0,
    width: '100vw',
  },
  root:{
    alignItems:'center',
    display:'flex',
    gap: spacing(4),
    justifyContent:'space-between',
    padding: spacing(0, 2,0 ,2),
  },
  transparent:{
    '& a':{
      ':visited':{
        color: 'inherit'
      }
    },
    backgroundColor: 'transparent'
  }
}));

export default memo(Nav);