import { useCallback, useState } from 'react';


export const useLocalStorage = ()=>{
  const initialJwt = localStorage.getItem('phpSSID');
  const initialUsername = localStorage.getItem('username');
  const [sessionData, setState] = useState({
    jwt: initialJwt ?? undefined,
    username: initialUsername ?? undefined
  });

  const logoutOrIn = useCallback(
    (jwt?: string | undefined, username?: string | undefined)=>{
      if(!jwt || ! username){
        localStorage.removeItem('phpSSID');
        localStorage.removeItem('username');
      }else{
        localStorage.setItem('phpSSID', jwt);
        localStorage.setItem('username', username);

      }
      setState({jwt, username});
    },[]);


  return {logoutOrIn, sessionData};
};