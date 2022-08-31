import { createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../../containers/Nav/Nav';
import MainCalendar from '../Calendar';
import { useLocalStorage } from '../hooks/localstorage';
import Login from '../Login';
import MainView from '../MainView';
import Register from '../Register';

interface Context {
  jwt?: string;
  username?: string;
  sessionAuth:(jwt?:string, username?: string ) => void
}

export const AuthContext = createContext<Context>({
  sessionAuth:() : void=> undefined,
});

const MainRouter = ()=>{
  const {sessionData, logoutOrIn} = useLocalStorage();
  return(
    <AuthContext.Provider value={{...sessionData, sessionAuth: logoutOrIn}}>
      <BrowserRouter basename='/tzuzulCodeReact'>
        <Nav />
        <Routes>
          <Route element={ <MainView />} path='/'/>
          <Route element={<MainCalendar />} path='/calendar'/>
          <Route element={<Register />} path='/singup' />
          <Route element={<Login />} path='/login' />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default MainRouter;
