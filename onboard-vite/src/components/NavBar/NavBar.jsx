import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Dashboard,
  Menu,
  Person,
  PowerSettingsNew,
  Security,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    "@media print": {
      display: "none",
    },
  },
  iconBtn: {
    marginRight: theme.spacing(1),
  },
  hero: {
    minWidth: 250,
    maxWidth: 420,
    padding: theme.spacing(6, 3),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    textAlign: "center",
    fontFamily: "'Satisfy', cursive",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const profile = useSelector((store) => store?.common?.profile);
  const name = profile?.name?.split(" ")?.[0] || profile?.username;

  return (
    <>
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.iconBtn}
            onClick={() => setDrawer(true)}
          >
            <Menu />
          </IconButton>
          {profile && (
            <Typography variant="h5" className={classes.title}>
              {name}'s board
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        {profile && (
          <div className={classes.hero}>
            <Typography variant="h5" className={classes.title} color="inherit">
              {name}'s board
            </Typography>
          </div>
        )}
        <List onClick={() => setDrawer(false)}>
          <ListItem
            button
            to="/dashboard"
            component={NavLink}
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
          <ListItem
            button
            to="/profile"
            component={NavLink}
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/password/change"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText>Change Password</ListItemText>
          </ListItem>
          <ListItem button onClick={() => dispatch(logout())}>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
