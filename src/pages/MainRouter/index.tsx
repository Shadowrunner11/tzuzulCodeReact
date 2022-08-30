import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../../containers/Nav/Nav';
import Login from '../Login';
import Register from '../Register';

const MainRouter = ()=>{
  return(
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<Register />} path='/singup' />
        <Route element={<Login />} path='/login' />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
