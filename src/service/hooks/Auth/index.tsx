import useAxios from 'axios-hooks';
import Auth from '../../Auth';
import { Nullable } from 'typescript-nullable';
import { useCallback } from 'react';

const loginConfig = {
  method: 'POST',
  url: Auth.loginUrl
};

const registerCofig = {
  method: 'POST',
  url: Auth.registerUrl
};

// creamos hook personalizado para mantener el login declarativo
// Este hook se esta encargado de dos cosas a la vez, considerar usar formik y yup

/** Permite el login a traves de un request HTTP POST
 *  de axios, intercepta errores comunes
 */
export const useLogin = () =>{
  const [{ data, loading, error }, execute] = useAxios( loginConfig,{ manual: true });
  // funcion impura, buscar alternativas
  const executeLogin = useCallback((email: Nullable<string>, password: Nullable<string>) => {
    return execute({
      data:{
        email,
        password
      }
    });
  }, []);

  // no esta justificado un use memo, error siempre cambia
  const errorBoundary = {
    invalidInput: Boolean(error && error.code === '403')
    //borrar esta linea solo es para mocking
      || error?.response?.data === 'Cannot find user' ,
    netWorkError: Boolean(error && error.code !== '403')
    //borrar esta linea solo es para mocking
      && error?.response?.data !== 'Cannot find user' ,
  };


  return [loading, errorBoundary, data, executeLogin];
};

export const useRegister = ()=>{
  const [{ data, loading, error }, execute] = useAxios(registerCofig,{ manual: true });

  const executeRegister = useCallback((data : any)=>{
    return execute({
      data
    });
  }, []);

  return [loading, error, data, executeRegister ];
};