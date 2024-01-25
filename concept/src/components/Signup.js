import React, { Component } from "react";
import { connect } from "react-redux";
import { signupUser } from "../actions";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

//import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

const styles = () => ({
    "@global": {
        body: {
            backgroundColor: "#fff"
        }
    },
    paper: {
        marginTop: 100,
        display: "flex",
        padding: 20,
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#f50057"
    },
    form: {
        marginTop: 1
    },
    errorText: {
        color: "#f50057",
        marginBottom: 5,
        textAlign: "center"
    }
});


class Signup extends Component {
    state = { fname: "", lname: "", email: "", password: "" };

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    handleFnameChange = ({ target }) => {
        this.setState({ fname: target.value });
    };

    handleLnameChange = ({ target }) => {
        this.setState({ lname: target.value });
    };

    handleSubmit = () => {
        const { dispatch } = this.props;
        const { fname, lname, email, password } = this.state;

        dispatch(signupUser(fname, lname, email, password));
    };

    render() {
        const { classes, signupError, isAuthenticated, errorMsg } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign up
                    </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="fname"
                            label="First Name"
                            name="fname"
                        onChange={this.handleFnameChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="lname"
                            label="Last Name"
                            name="lname"
                        onChange={this.handleLnameChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={this.handlePasswordChange}
                        />
                        {signupError && (
                            <Typography component="p" className={classes.errorText}>
                                {errorMsg}
                            </Typography>
                        )}
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                        >
                            Sign Up
                    </Button>
                    </Paper>
                </Container>

            );
        }
    }

}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        signupError: state.auth.signupError,
        isAuthenticated: state.auth.isAuthenticated,
        errorMsg: state.auth.errorMsg
    };
}

export default withStyles(styles)(connect(mapStateToProps)(Signup));