import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useContext, useState } from 'react';
import DropDown from './DropDown';

const drawerWidth = 280;
const navItems = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Explore Tests',
    path: '/all-tests'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Contact',
    path: '/contact'
  },
];

const AppMenu = (props) => {
  // user
  const { user } = useContext(AuthContext)

// console.log(user);

  // Appbar scripts

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const appLogo = (<img className='h-14' src="/logo.png" alt="Diag Central Logo" />)
  const appBarMenu = (
    <List sx={{display:{md:'flex'}, gap: 3, alignItems: 'center'}}>
      {
        navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active text-defaultText" : ""
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))
      }

      {
        !user ?
          <li>
            <NavLink
              to='/login'
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active text-defaultText" : ""
              }
            >
              Login
            </NavLink>
          </li>
          : <DropDown />
      }          
      
    </List >
  )



  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {appLogo}
      </Typography>
      <Divider />
      <div>
        {appBarMenu}
      </div>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }


  return (
    <Box sx={{ display: 'flex', mb: 10 }}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar component="nav" sx={{ backgroundColor: 'white', py: 1, }}>
          <Toolbar className='px-0'>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { md: 'block', xs: 'none' } }}
            >
              {appLogo}
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <div className='flex gap-4 items-center justify-center font-bold text-primary opacity-90'>
                {appBarMenu}
              </div>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box >
  );


}

AppMenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  children: PropTypes.any,
};

export default AppMenu;