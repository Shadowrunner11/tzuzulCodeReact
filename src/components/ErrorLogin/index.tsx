import { Typography } from '@mui/material';

type ErrorLoginProps = {
  errorStatus:{
    invalidInput: boolean,
    netWorkError: boolean
  }
}

const ErrorLogin = ({errorStatus}: ErrorLoginProps)=>{
  return(
    <>
      {errorStatus.invalidInput &&
      <Typography color='red' variant='caption'>
        Credenciales invalidas
      </Typography>
      }
      {
        errorStatus.netWorkError &&
      <Typography color='red' variant='caption'>
        Algo ha salido mal, intentelo mas tarde
      </Typography>
      }
    </>
  );
};

export default ErrorLogin;

/* ErrorLogin.propTypes = {
  errorStatus: PropTypes.shape({
    invalidInput: PropTypes.bool,
    netWorkError: PropTypes.bool
  })
}; */