import { Box, CircularProgress, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MouseEvent, useRef, memo } from 'react';
import { makeStyles } from 'tss-react/mui';
import ErrorLogin from '../../components/ErrorLogin';
import { useLogin } from '../../service/hooks/Auth';

const Login = () => {
  const { classes } = useStyles();

  const [ loading, error , , login ] = useLogin();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const _handleAuth = (e : MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    login(
      usernameRef?.current?.value,
      passwordRef?.current?.value
    );
  };


  return (
    <Box className={classes.root} component='form'>
      <TextField error={error.invalidInput} inputRef={usernameRef} label='Username'/>
      <TextField error={error.invalidInput} inputRef={passwordRef} label='Password'/>
      <Box>
        <LoadingButton
          className={classes.button}
          loading={loading}
          loadingIndicator={<CircularProgress/>}
          onClick={_handleAuth}
          variant='contained'>
          Log in
        </LoadingButton>
      </Box>
      <ErrorLogin errorStatus={error}/>
    </Box>
  );
};

const useStyles = makeStyles()(({palette, spacing}) => {
  return {
    button:{
      backgroundColor: palette.primary.dark,
      color: palette.text.primary,
      width: '100%'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing(2),
      maxWidth: spacing(60),
      width: '50vw'
    }
  };
});

export default memo(Login);