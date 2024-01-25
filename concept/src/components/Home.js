import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logoutUser, getResources } from "../actions";
import { withStyles } from "@material-ui/styles";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { createMuiTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const theme = createMuiTheme();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const styles = () => ({

  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },

  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },

  list: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },

});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function renderResource(props) {
  const { title, concept, description, link, type, depth, hands_on, user } = props;

  return (
    <ListItem>
      <ListItemText primary={title} />
      <ListItemText primary={description} />
    </ListItem>
  );
}

class Home extends Component {
  state = { tab: 0, anchorEl: null };

  handleMenuLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  handleTabChange = (event, newValue) => {
    this.setState({ tab: newValue });
  }

  handleMenuOpen = ({ target }) => {
    this.setState({ anchorEl: target });
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(getResources());
  }

  render() {
    const { classes, resources } = this.props;
    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" onClick={this.handleMenuOpen} className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              30DaysofCode
          </Typography>
          </Toolbar>
          <Tabs value={this.state.tab} onChange={this.handleTabChange} variant="fullWidth" aria-label="simple tabs example">
            <Tab label="New" {...a11yProps(0)} />
            <Tab label="Popular" {...a11yProps(1)} />
            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </AppBar>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={this.handleMenuLogout}>Logout</MenuItem>
        </Menu>
        <TabPanel value={this.state.tab} index={0}>
          <List className={classes.list} subheader={<li />}>
            {resources.map((resource) => (
              <ListItem key={resource.title} alignItems="flex-start">
                <ListItemText primary={resource.title} />
                <ListItemText primary={resource.description} />
              </ListItem>
            ))}
          </List>
        </TabPanel>
        <TabPanel value={this.state.tab} index={1}>
          Item Two
        </TabPanel>
        <Link to="/new_concept">
          <Fab className={classes.fab} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    resources: state.fetch.resources,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Home));