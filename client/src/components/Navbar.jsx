import React, { useState } from "react";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import { Box, Menu, Typography, useTheme } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ProfileImage from "../assets/pic-profile.jpg";
import { AppBar, IconButton, InputBase, Toolbar } from "@mui/material";
import { Button, MenuItem } from "@mui/material";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEL, setanchorEL] = useState(null);
  const isOpen = Boolean(anchorEL);
  const handleClick = (event) => setanchorEL(event.currentTarget);
  const handleClose = (event) => setanchorEL(null);

  return (
    <>
      <AppBar
        sx={{
          position: "static",
          background: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          {/* leftside */}
          <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuOutlinedIcon />
            </IconButton>

            <FlexBetween
              backgroundColor={theme.palette.background.alt}
              borderRadius="9px"
              gap="3rem"
              p="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <SearchOutlinedIcon />
              </IconButton>
            </FlexBetween>
          </FlexBetween>

          {/* Right side */}
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon s={{ fontSize: "25px" }} />
              ) : (
                <LightbulbOutlinedIcon sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon sx={{ fontSize: "25px" }} />
            </IconButton>

            <FlexBetween>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "ceneter",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                  <Box
                    component="img"
                    alt="profile"
                    src={ProfileImage}
                    height="32px"
                    width="32px"
                    borderRadius="50%"
                    sx={{ objectFit: "center" }}
                  />
                  <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="0.8rem"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      {user?.name}
                    </Typography>

                    <Typography
                      fontSize="0.7rem"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      {user?.occupation}
                    </Typography>
                  </Box>
                    <ArrowDropDownOutlinedIcon
                    sx={{color: theme.palette.secondary[300],fontSize:'25px'}}/>
              </Button>
              <Menu anchorEl={anchorEL} open={isOpen} onClose={handleClose} anchorOrigin={{vertical:"bottom", horizontal:"center"}}>
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </FlexBetween>
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
