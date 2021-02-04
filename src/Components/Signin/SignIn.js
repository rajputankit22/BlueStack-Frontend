import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Copyright } from "../Footer/Copyright";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signIn } from "../../store/actions/employeeActions";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';

const useStyles = (theme) => ({
  paper: {
    marginTop: "64px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: "8px",
    backgroundColor: "#f50057",
  },
  form: {
    width: "100%",
    marginTop: "8px",
  },
  submit: {
    margin: "24px 0px 16px",
  },
  Bg: {
    backgroundColor: "#f4f5fa",
  },
  title: {
    color: "#075065",
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: "",
      username: "",
      password: "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onConfirm = () => this.setState({ show: false, message: "" });

  onSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: this.state.username,
      password: this.state.password,
    };
    this.props.signIn(user);
  };

  render() {
    const { classes } = this.props;
    if (this.props.isAuthenticated) {
      return <Redirect to="/App/AllEmployees" />;
    }
    return (
      <section className={classes.Bg}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <br />
            <Typography className={classes.title} component="h1" variant="h5">
              Sign In for Admin
            </Typography>

            <form className={classes.form} onSubmit={this.onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                value={this.state.username}
                type="email"
                label="Email Address"
                name="username"
                InputLabelProps={{ shrink: true }}
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={this.state.password}
                label="Password"
                type="password"
                id="password"
                InputLabelProps={{ shrink: true }}
                onChange={this.onChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </section>
    );
  }
}

// Typechecking With PropTypes
SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// mapStateToProps is used for selecting the part of the data from the store that the connected component needs.
const mapStateToProps = (state) => ({
  isAuthenticated: state.employee.isAuthenticated,
});

export default connect(mapStateToProps, { signIn })(
  withStyles(useStyles)(SignIn)
);
