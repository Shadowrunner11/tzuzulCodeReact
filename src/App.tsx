import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createContext, useMemo, useState } from 'react';
import MainRouter from './pages/MainRouter';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorModeContext  =  createContext(({ toogleMode : ()=>{}}));

function App() {
  const currentMode = !window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';

  const [mode, setMode] = useState<'light' | 'dark'>(currentMode);

  const colorMode = useMemo(
    ()=>({toogleMode: ()=> setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))})
    ,[]);

  const theme  = useMemo(
    () => createTheme({palette: {mode}})
    , [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{alignItems:'center', display:'flex', flexDirection:'column', justifyContent: 'center'}}>
          <MainRouter />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
