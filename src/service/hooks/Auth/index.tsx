import useAxios from 'axios-hooks';
import Auth from '../../Auth';
import { Nullable } from 'typescript-nullable';
import { useCallback, useState } from 'react';

const loginConfig = {
  method: 'POST',
  url: Auth.loginUrl
};

// creamos hook personalizado para mantener el login declarativo
// Este hook se esta encargado de dos cosas a la vez, considerar usar formik y yup

/** Permite el login a traves de un request HTTP POST
 *  de axios, intercepta errores comunes
 */
export const useLogin = () =>{
  const [ isValid, setIsValid ] = useState(true);
  const [{ data, loading, error }, execute] = useAxios( loginConfig,{ manual: true });

  // funcion impura, buscar alternativas
  const executeLogin = useCallback((username: Nullable<string>, password: Nullable<string>) => {
    if(!username && !password)
      return setIsValid(false);

    setIsValid(true);

    return execute({
      data:{
        password,
        username
      }
    });
  }, []);

  // no esta justificado un use memo, error siempre cambia
  const errorBoundary = {
    invalidInput: Boolean(error && error.code == '403') || !isValid,
    netWorkError: Boolean(error && error.code !== '403') && isValid
  };


  return [loading, errorBoundary, data, executeLogin];
};