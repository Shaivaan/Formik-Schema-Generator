import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import "./Navbar.css";
import logo from '../../assets/titleIcon.png'

export default function MenuAppBar() {

  return (
     <AppBar className='nav_parent'>
     <Toolbar>
       <IconButton
         size="large"
         edge="start"
         color="inherit"
         aria-label="menu"
         sx={{ mr: 2 }}
       >
         <img src={logo} height={'30px'} width={'30px'}/>
       </IconButton>
       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         Formik Schema Generator
       </Typography>
     </Toolbar>
   </AppBar>
  );
}