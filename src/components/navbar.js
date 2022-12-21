import '../components/navbar.css'
import * as React  from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useCookies } from 'react-cookie';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const pages = ['advertenties','producten', 'profiel','chat'];

export default function ButtonAppBar() {

  const [authenticated, setAuthenticated] = React.useState(false);
  //const [user, setUser] = React.useState(undefined);
  const [cookies] = useCookies(['XSRF-TOKEN']);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  //getting the user based on credentials.
  React.useEffect(() => {
    fetch('/login/getUser', { credentials: 'include' })
      .then(response => response.text())
      .then(body => {
        if (body === '') {
          setAuthenticated(false);
        } else {
          //setUser(JSON.parse(body));
          setAuthenticated(true);
        }
      });
  }, [setAuthenticated/*,setUser*/])

  //logging the user in.
  const login = () => {
    let port = (window.location.port ? ':' + window.location.port : '');
    if (port === ':3000') {
      port = ':8080';
    }
    window.location.href = `//${window.location.hostname}${port}/private`;
  }

  //logging the user out.
  const logout = () => {
    fetch('/login/logout', {
      method: 'POST', credentials: 'include',
      headers: { 'X-XSRF-TOKEN': cookies['XSRF-TOKEN'] }
    })
      .then(res => res.json())
      .then(response => {
        window.location.href = `${response.logoutUrl}?id_token_hint=${response.idToken}`
          + `&post_logout_redirect_uri=${window.location.origin}`;
      });
  }

  //check if user is authenticated
  const state = authenticated ? 
  <Button color="inherit" onClick={logout}>Logout</Button>:
  <Button color="inherit" onClick={login}>Login</Button>;

  //handle responsive menu-bar
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function goToHome(){
    window.location.href = "/";
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "purple"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
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
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Button style={{color:"black"}} textalign="center" href={'/' + page}>{page}</Button>
                </MenuItem>
              ))}
            </Menu>
          <Typography onClick={goToHome} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Marktplaats
          </Typography>
          {state}
          </Toolbar>
      </AppBar>
    </Box>
  );
}