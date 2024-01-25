import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logoutUser, addConcept} from "../actions";
import { withStyles } from "@material-ui/styles";

import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import InputAdornment from '@material-ui/core/InputAdornment';
import LinkIcon from "@material-ui/icons/Link";
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Box, Button } from "@material-ui/core";


const theme = createMuiTheme();

const styles = () => ({


    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '95%',
        },
        '& .description': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        '& .MuiTypography-root ': {
            margin: theme.spacing(1),
            marginBottom: theme.spacing(0.1),
            width: '90%',
        },
        '& .MuiBox-root': {
            margin: theme.spacing(1),
        },
        '& .pretto': {
            margin: theme.spacing(1),
            marginTop: theme.spacing(0.1),
            width: '90%',
        }

    },
});
const ResourceTypes = [
    {
        value: 'video',
        label: 'Video',
    },
    {
        value: 'course',
        label: 'Course',
    },
    {
        value: 'book',
        label: 'Book',
    },
    {
        value: 'article',
        label: 'Article',
    },
];
const ResourceDepths = [
    {
        value: 'overview',
        label: 'Overview',
    },
    {
        value: 'introductory',
        label: 'Introductory',
    },
    {
        value: 'intermediate',
        label: 'Intermediate',
    },
    {
        value: 'advanced',
        label: 'Advanced',
    },
];

class NewConcept extends Component {
    state = {
        anchorEl: null, type: "article", depth: "overview", hands_on: false,
        title: "", concept: "", description: "", link: ""
    };

    handleMenuLogout = () => {
        //console.log("NewConcept, Menu, Logout")
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };

    handleMenuOpen = ({ target }) => {
        this.setState({ anchorEl: target });
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    }

    handleType = (event) => {
        this.setState({ type: event.target.value });
    };

    handleDepth = (event) => {
        this.setState({ depth: event.target.value });
    };

    handleHandsOn = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleShout = () => {
        const { dispatch, user } = this.props;
        const { title, concept, description, link, type, depth, hands_on, } = this.state;
        console.log("NewConcept:HandleShout")
        dispatch(addConcept(title, concept, description, link, type, depth, hands_on, user) );
    }

    handleTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    handleConcept = (event) => {
        this.setState({ concept: event.target.value });
    }

    handleDescription = (event) => {
        this.setState({ description: event.target.value });
    }

    handleLink = (event) => {
        this.setState({ link: event.target.value });
    }

    render() {
        const { classes, isLoggingOut, logoutError } = this.props;
        return (
            <Fragment >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" onClick={this.handleMenuOpen} className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add New Concept
                        </Typography>
                    </Toolbar>
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
                <form className={classes.root} noValidate autoComplete="off">
                    <div>

                        <TextField
                            id="title"
                            label="Title"
                            placeholder="Resource title here"
                            variant="outlined"
                            onChange={this.handleTitle}
                        />

                        <TextField
                            id="concept"
                            label="Concept"
                            placeholder="The Concept the resource tackle"
                            variant="outlined"
                            onChange={this.handleConcept}
                        />

                        <TextField
                            id="link"
                            label="Link"
                            placeholder="Resource link here"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LinkIcon />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={this.handleLink}
                        />
                        <TextField
                            id="description"
                            className="description"
                            label="Description"
                            placeholder="Resource description here"
                            multiline
                            rows={4}
                            variant="outlined"
                            onChange={this.handleDescription}
                        />
                        <TextField
                            id="type"
                            select
                            label="Type"
                            value={this.state.type}
                            onChange={this.handleType}
                            helperText="Please select resource type"
                            variant="outlined"
                        >
                            {ResourceTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="depth"
                            select
                            label="Depth"
                            value={this.state.depth}
                            onChange={this.handleDepth}
                            helperText="Please select resource depth"
                            variant="outlined"
                        >
                            {ResourceDepths.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Box display="flex">
                            <Box>
                                <Typography>
                                    Is Hands On
                                </Typography>
                            </Box>
                            <Box flexGrow={1}>
                                <Switch
                                    checked={this.state.hands_on}
                                    onChange={this.handleHandsOn("hands_on")}
                                    value="Hands On"
                                />
                            </Box>
                            <Box >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={this.handleShout}
                                >
                                    Shout!
                                </Button>
                            </Box>
                        </Box>
                    </div>
                </form>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user.uid,
    };
}

export default withStyles(styles)(connect(mapStateToProps)(NewConcept));