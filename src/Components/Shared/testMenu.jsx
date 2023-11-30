
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useContext, useEffect, useState } from 'react';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // user
  const { user, logOut } = useContext(AuthContext)

  // console.log(user);

  const { displayName, photoURL, email } = user || {};

  // console.log(dbUsers);

  const [dbUsers, setDbUsers] = useState([])

  useEffect(() => {
    axios.get('https://diag-central-server.vercel.app/users', { withCredentials: true })
      .then((res) => {
        if (user) {
          const loggedInUser = res?.data?.filter(item => item.userEmail === user?.email);
          if (loggedInUser.length > 0) {
            setDbUsers(loggedInUser[0]);
          }
        }

      })
      .catch(err => console.log(err))

  }, [user]);




  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const appLogo = (<img className='h-14' src="/logo.png" alt="Diag Central Logo" />)


  const handleLogOut = () => {

    logOut()
      .then(() => {
        axios.post('https://diag-central-server.vercel.app/logout', { user: email }, { withCredentials: true })
          .then(res => {
            console.log(res.data);
          })
      })
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
  }



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {appLogo}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem  >
                <NavLink
                  onClick={handleCloseNavMenu}

                  to='/'
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active text-defaultText" : ""
                  }
                >
                  Home
                </NavLink>
              </MenuItem>
              <MenuItem  >
                <NavLink
                  onClick={handleCloseNavMenu}

                  to='/all-tests'
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active text-defaultText" : ""
                  }
                >
                  All Tests
                </NavLink>
              </MenuItem>
              <MenuItem  >
                <NavLink
                  onClick={handleCloseNavMenu}

                  to='/about us'
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active text-defaultText" : ""
                  }
                >
                  About us
                </NavLink>
              </MenuItem>
              <MenuItem  >
                <NavLink
                  onClick={handleCloseNavMenu}

                  to='/blogs'
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active text-defaultText" : ""
                  }
                >
                  Blogs
                </NavLink>
              </MenuItem>
              <MenuItem  >
                <NavLink
                  onClick={handleCloseNavMenu}

                  to='/contact-us'
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active text-defaultText" : ""
                  }
                >
                  Contact
                </NavLink>
              </MenuItem>

              <MenuItem>
                {
                  user && dbUsers?.role === 'user' ?
                    <NavLink
                      to='/user-dashboard'
                      className={`${({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""} py-2 px-2 text-black text-base border border-secondary hover:bg-secondary block rounded-md`}
                    >
                      Dashboard
                    </NavLink> : ''
                }
              </MenuItem>
              <MenuItem>
                {
                  user && dbUsers?.role === 'admin' ?
                    <NavLink
                      to='/admin-dashboard'
                      className={`${({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""} py-2 px-2 text-black text-base border border-secondary hover:bg-secondary block rounded-md`}
                    >
                      Admin Dashboard
                    </NavLink> : ''
                }
              </MenuItem>

              <MenuItem>
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
                    : ""
                }
              </MenuItem>


            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {appLogo}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <MenuItem  >
              <NavLink
                onClick={handleCloseNavMenu}

                to='/'
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active text-defaultText" : ""
                }
              >
                Home
              </NavLink>
            </MenuItem>
            <MenuItem  >
              <NavLink
                onClick={handleCloseNavMenu}

                to='/all-tests'
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active text-defaultText" : ""
                }
              >
                All Tests
              </NavLink>
            </MenuItem>
            <MenuItem  >
              <NavLink
                onClick={handleCloseNavMenu}

                to='/about-us'
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active text-defaultText" : ""
                }
              >
                About us
              </NavLink>
            </MenuItem>
            <MenuItem  >
              <NavLink
                onClick={handleCloseNavMenu}

                to='/blogs'
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active text-defaultText" : ""
                }
              >
                Blogs
              </NavLink>
            </MenuItem>
            <MenuItem  >
              <NavLink
                onClick={handleCloseNavMenu}

                to='/contact-us'
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active text-defaultText" : ""
                }
              >
                Contact
              </NavLink>
            </MenuItem>

          </Box>

          {
            user ?
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={`Hi ${displayName}`}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={photoURL} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    {
                      user ? <Button
                        fullWidth
                        variant='outlined'
                        color={'error'}
                        onClick={handleLogOut}
                        sx={{ fontWeight: 'bold', color: 'red' }}
                        className='absolute'
                      >
                        Log out
                      </Button> : ''
                    }
                  </MenuItem>

                </Menu>
              </Box>:''
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;