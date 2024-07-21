import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Routes/Home/Home';
import MenuAppBar from './Components/Navbar/Navbar';
import { Box } from '@mui/material';
import LandingPage from './Routes/LandingPage/LandingPage';


function App() {
  return (
    <>
      <MenuAppBar/>              
      <Routes>
        <Route path='/schema' element={<Home/>}/>
        <Route path='/' element = {<LandingPage/>}/>
        <Route path='*' element={<Box>Blank</Box>}/>
      </Routes>
    </>
  )
}

export default App
