import { memo, useCallback, useContext, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from 'tss-react/mui';
import { keyframes } from 'tss-react';
import { Box, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility as OpenEyeIcon, VisibilityOff as ClosedEyeIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import ErrorLogin from '../../components/ErrorLogin';
import { useLogin } from '../../service/hooks/Auth';
import schema from './validation';
import KeySvg from '../../components/KeySvg';

import { AuthContext } from '../MainRouter';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { sessionAuth } = useContext(AuthContext);

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const [ loading, error , , login ] = useLogin();

  const _handleAuth = useCallback(handleSubmit((data: FieldValues) => {
    const { email, password } = data;
    login(email,password)
      .then(({data : {phpssid, username}}: any)=>{
        sessionAuth(phpssid, username);
        navigate('/calendar');
      });
  })
  ,[]);

  const _handleChangeVisibility = useCallback(()=>{
    setIsPasswordVisible(prev => !prev);
  },[]);

  // Buscar algun patron para que el breaching no se vea tan feo
  const PasswordAdornement = () => (
    <InputAdornment position='end'>
      <IconButton onClick={_handleChangeVisibility}>
        { !isPasswordVisible && <OpenEyeIcon /> }
        { isPasswordVisible && <ClosedEyeIcon />}
      </IconButton>
    </InputAdornment>
  );

  const EmailInput = () => (
    <TextField
      error={Boolean(errors.email)}
      helperText={String(errors?.email?.message ?? '')}
      inputProps={{...register('email')}}
      label='Email'/>
  );

  const PasswordInput = () =>(
    <TextField
      InputProps={{
        endAdornment : <PasswordAdornement />}}
      error={Boolean(errors.password)}
      helperText={String(errors?.password?.message ?? '')}
      inputProps={{...register('password')}}
      label='Password'
      type={isPasswordVisible ? 'text' : 'password'}/>
  );

  return (
    <Box className={classes.root} component='form' onSubmit={_handleAuth}>
      <KeySvg />
      <EmailInput />
      <PasswordInput />
      <LoadingButton
        className={classes.button}
        loading={loading}
        loadingIndicator={<CircularProgress/>}
        type='submit'
        variant='contained'>
          Log in
      </LoadingButton>
      <ErrorLogin errorStatus={error}/>
    </Box>
  );
};

const useStyles = makeStyles({name : 'LoginContainer'})(({spacing}) => {
  return {
    button:{
      width: '100%'
    },
    root: {
      '& > svg':{
        '& g': {
          'animation': `${keyframes`
          100% {
              opacity: 1;
          }
          0% {
              opacity: 0;
          }
          40% {
              opacity: 0.4;
          }
          `} 4.5s ease-in-out`,
          'opacity': 1
        },
        height: spacing(40),
        margin: 'auto',
        maxWidth: spacing(60),
        width: '50vw'
      },
      display: 'flex',
      flexDirection: 'column',
      gap: spacing(2),
      margin: 'auto',
      maxWidth: spacing(60),
      width: `max(${spacing(10)}, 50vw)`
    }
  };
});

export default memo(Login);