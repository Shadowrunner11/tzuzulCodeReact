import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from 'tss-react/mui';
import { Box, MenuItem, TextField } from '@mui/material';
import schema from './validations';
import { Gender } from '../../types/constants';
import { useCallback } from 'react';
import { useRegister } from '../../service/hooks/Auth';
import { LoadingButton } from '@mui/lab';

const genderList  = Object.entries(Gender);

const Register = ()=>{
  const { classes } = useStyles();

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const [loading, error, data, execRegister] = useRegister();

  const EmailInput = () => (
    <TextField
      error={Boolean(errors.email)}
      helperText={String(errors?.email?.message ?? '')}
      inputProps={{...register('email')}}
      label='Email'/>
  );

  const PasswordInput = ({schemaProp, errorProp, label}:{schemaProp: string, errorProp: any, label: string}) =>(
    <TextField
      error={Boolean(errorProp)}
      helperText={String(errorProp?.message ?? '')}
      inputProps={{...register(schemaProp)}}
      label={label}
      type='password'/>
  );

  const GenderSelect = ()=>(
    <TextField
      defaultValue={'MALE'}
      helperText="Selecione su genero"
      id="gender"
      inputProps={{...register('gender')}}
      label="Genero"
      select
    >
      {genderList.map(([key,gender])=> <MenuItem key={key} value={key}>{gender}</MenuItem>)}
    </TextField>
  );

  const NameInput = ({schemaProp, errorProp, label}:{schemaProp: string, errorProp: any, label: string}) => (
    <TextField
      error={Boolean(errorProp)}
      helperText={String(errorProp?.message ?? '')}
      inputProps={{...register(schemaProp)}}
      label={label}
      type='text'/>
  );

  const DateInput = () =>(
    <TextField
      InputLabelProps={{ shrink: true }}
      defaultValue={dayjs().format('YYYY-MM-DD')}
      error={Boolean(errors.date)}
      helperText={String(errors?.date?.message ?? '')}
      inputProps={{...register('date')}}
      label='Cumpleaños'
      type='date'/>
  );

  const Username = ()=>(
    <TextField
      error={Boolean(errors.username)}
      helperText={String(errors?.username?.message ?? '')}
      inputProps={{...register('username')}}
      label='Nombre de usuario'
      type='username'/>
  );

  const _handleSubmit = useCallback(handleSubmit((data)=>{
    console.log(data);
    execRegister(data);
  }), []);

  return(
    <Box className={classes.root} component='form' onSubmit={_handleSubmit}>
      <Username />
      <EmailInput />
      <PasswordInput errorProp={errors?.password} label='Contraseña' schemaProp='password'/>
      <PasswordInput errorProp={errors?.password2} label='Repita contraseña' schemaProp='password2'/>
      <NameInput errorProp={errors?.name} label='Nombre' schemaProp='name' />
      <NameInput errorProp={errors?.lastname} label='Apellido' schemaProp='lastname' />
      <GenderSelect />
      <DateInput />
      <LoadingButton loading={loading} type='submit' variant='contained'>
        Registrarse
      </LoadingButton>
    </Box>
  );
};

const useStyles = makeStyles({name : 'LoginContainer'})(({spacing}) => {
  return {
    button:{
      width: '100%'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing(2),
      margin: 'auto',
      maxWidth: spacing(80),
      width: `max(${spacing(10)}, 50vw)`
    }
  };
});

export default Register;