import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useContext, useState } from 'react';

const drawerWidth = 240;
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

const privateNavItems = [
  {
    name: 'Dashboard',
    path: '/admin-dashboard'
  }
];

const userAuthNavItems = [
  {
    name: 'Login',
    path: '/login'
  }
]

const AppMenu = (props) => {
  // user
  const { user, logOut } = useContext(AuthContext)








  // Appbar scripts

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img className='h-14' src="logo.png" alt="Diag Central Logo" />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              <NavLink
                to={item.path}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <ListItemText primary={item.name} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
        {privateNavItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              <NavLink
                to={item.path}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <ListItemText primary={item.name} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
        {userAuthNavItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              <NavLink
                to={item.path}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <ListItemText primary={item.name} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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

  const handleLogOut = () => {
    logOut()
    .then(res => console.log(res))
    .catch(err => console.log(err))
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
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <img className='h-14' src="logo.png" alt="Diag Central Logo" />
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item, index) => (
                <Button key={index} sx={{ fontWeight: 'bold' }}>
                  <NavLink
                    to={item.path}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active text-white" : ""
                    }
                  >
                    {item.name}
                  </NavLink>
                </Button>
              ))}
              {!user ? userAuthNavItems.map((item, index) => (
                <Button key={index} sx={{ fontWeight: 'bold' }}>
                  <NavLink
                    to={item.path}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                  >
                    {item.name}
                  </NavLink>
                </Button>
              )) : ''}
              {user ? privateNavItems.map((item, index) => (
                <Button key={index} sx={{ fontWeight: 'bold' }}>
                  <NavLink
                    to={item.path}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                  >
                    {item.name}
                  </NavLink>
                </Button>
              )) : ''}
              {user ? <Button
                onClick={handleLogOut}
                sx={{ fontWeight: 'bold', color: 'red' }}
                className='absolute'
              >
                Log out
              </Button> : ''}
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
            display: { xs: 'block', sm: 'none' },
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