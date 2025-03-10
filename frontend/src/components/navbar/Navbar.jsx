import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
import logo1 from '../../assets/cropped-bit_logo-192x192.png'

const role = localStorage.getItem("userRole");

const pages = (role === 'admin')
  ? [{ name: 'Home', path: "/adminhome" }, { name: 'All Feedbacks', path: "/adminfeedback" }]
  : [{ name: 'Home', path: "/home" }, { name: 'My Feedbacks', path: "/feedback" }];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 
  const handleLogout = () => {
    localStorage.removeItem("userRole"); 
    setAnchorElUser(null);
    navigate("/"); 
  };

  return (
    <Box>
      <AppBar position="fixed" sx={{ backgroundColor: "white", borderRadius: 2, color: "black", boxShadow: "2" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo1} alt="logo" style={{ width: "50px", height: "50px",marginRight:"5px" }} />
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <IconButton 
                size="large" 
                aria-label="menu"
                onClick={handleOpenNavMenu} 
                sx={{ color: "black" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                    <Typography component={NavLink} to={page.path} sx={{ textDecoration: "none", color: "black" }}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mr: "auto" }}>
              <Typography
                variant="h6"
                noWrap
                component={NavLink}
                to="/"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                BIT Meetings
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
              {pages.map((page) => (
                <Button
                  key={page.path}
                  component={NavLink}
                  to={page.path}
                  sx={{ my: 2, color: 'black', display: 'block', mx: 1 }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogout}> 
                  <Typography sx={{ textAlign: 'center', color: "black" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;
