import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "src/context/AuthUserContext";

export const NavbarHome = () => {
  const router = useRouter();
  const { authUser, loading, authUserType } = useAuth();

  const default_pages = [
    { name: "About us", href: "/about" },
    { name: "Contact us", href: "/contact" },
    { name: "Login", href: "/login" },
  ];
  const [pages, setPages] = useState(default_pages);

  useEffect(() => {
    if (loading) return;
    if (!authUser) {
      setPages(default_pages);
      return;
    }
    switch (authUserType) {
      case "practitioner":
        setPages([
          { name: "Dashboard", href: "/login" },
          { name: "Patients List", href: "/patients-list" },
          { name: "Inventory List", href: "/inventory-list" },
          { name: "Logout", href: "/logout" },
        ]);
        break;
      case "admin":
        setPages([
          { name: "Dashboard", href: "/login" },
          { name: "Patients List", href: "/patients-list" },
          { name: "Doctors List", href: "/doctors-list" },
          { name: "Nurses List", href: "/nurses-list" },
          { name: "Inventory List", href: "/inventory-list" },
          { name: "Financial", href: "/financial" },
          { name: "Password Reset", href: "/password-reset"},
          { name: "Logout", href: "/logout" },
        ]);
        break;
      default:
        setPages([
          { name: "Dashboard", href: "/login" },
          { name: "Logout", href: "/logout" },
        ]);
        break;
    }
  }, [loading, authUser, authUserType]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image
            src="/logo.png"
            alt="MedSuite logo"
            width="150px"
            height="80px"
            objectFit="contain"
            onClick={() => {
              if (!authUser) router.push("/");
              else router.push("/login");
            }}
            style={{ cursor: "pointer" }}
          />
          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "flex-end" }}
          >
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ name, href }, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={() => router.push(href)}>
                    {name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}
          >
            {pages.map(({ name, href }, index) => (
              <Button
                key={index}
                onClick={() => router.push(href)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarHome;
