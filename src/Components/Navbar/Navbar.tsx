import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import "./Navbar.css";
import logo from '../../assets/titleIcon.png'
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
  const navigate = useNavigate();

  return (
     <AppBar className='nav_parent'>
     <Toolbar onClick={()=>navigate('/')}>
       <IconButton
         size="large"
         edge="start"
         color="inherit"
         aria-label="menu"
         sx={{ mr: 2 }}
       >
         <img src={logo} height={'30px'} width={'30px'}/>
       </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1,cursor:'pointer' }} >
          Yup Schema Generator
        </Typography>
     </Toolbar>
   </AppBar>
  );
}