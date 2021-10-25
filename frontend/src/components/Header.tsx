import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import TheatersIcon from "@mui/icons-material/Theaters";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Button } from "@mui/material";
import { getUser, logout } from "../service/auth";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [Auth, setAuth] = React.useState(true);
  const [User, setUser] = React.useState(Object);

  React.useEffect(() => {
    getUser()
      .then((data: any) => {
        setUser(data);
        setAuth(true);
      })
      .catch((error: any) => {
        setAuth(false);
        console.error(error.message);
      });
  }, []);

  const signout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setAuth(false);
    logout();
    window.location.replace("/");
  };
  
  const goToDashboard = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location.replace("/dashboard");
  }

  const goToLive = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location.replace("/channel/create-stream");
  }

  const goToChannel = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location.replace("/channel");
  }
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const rehome = () => {
    window.location.replace("/");
  };


  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={goToChannel}>
        <TheatersIcon />
        &nbsp;&nbsp;Your Channel
      </MenuItem>
      {User.is_superuser ? (
        <MenuItem onClick={goToDashboard}>
          <AdminPanelSettingsIcon />
          &nbsp;&nbsp;Dashboard
        </MenuItem>
      ) : null}
      <MenuItem onClick={signout}>
        <LogoutIcon />
        &nbsp;&nbsp;Sign Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={goToLive}>
        <LiveTvIcon />
        &nbsp;&nbsp;Live
      </MenuItem>
      <MenuItem onClick={goToChannel}>
        <TheatersIcon />
        &nbsp;&nbsp;Your Channel
      </MenuItem>
      {User.is_superuser ? (
        <MenuItem onClick={goToDashboard}>
          <AdminPanelSettingsIcon />
          &nbsp;&nbsp;Dashboard
        </MenuItem>
      ) : null}
      <MenuItem onClick={signout}>
        <LogoutIcon />
        &nbsp;&nbsp;Sign Out
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#1E5128" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, fontSize: "3vh" }}
            onClick={rehome}
            style={{ cursor: "pointer" }}
          >
            Video Streaming Website
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {Auth ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="contained" color="error" href="/channel/create-stream">
                Live
              </Button>
              <Button
                variant="contained"
                aria-controls={menuId}
                onClick={handleProfileMenuOpen}
                sx={{ ml: 2 }}
                startIcon={<PersonIcon />}
                color="info"
              >
                {User.username}
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                href="/signin"
                style={{ color: "#fff" }}
                startIcon={<LoginIcon />}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                href="/signup"
                sx={{ ml: 2 }}
                color="warning"
                startIcon={<VpnKeyIcon />}
              >
                Sign Up
              </Button>
            </Box>
          )}

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
