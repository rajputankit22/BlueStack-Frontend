import React from "react";
import "./App.css";
import PropTypes from "prop-types";
import SignIn from "./Components/Signin/SignIn";
import AdminPanel from "./DashboardLayout";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ToastContainer, Zoom } from "react-toastify";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#63CCFF",
      main: "#1ac6ff",
      contrastText: "#fff"
    },
    secondary: {
      main: "#075065"
    }
  },
  overrides: {
    MuiTab: {
      root: {
        background: "#6F6F6E",
        color: "#fff !important",
        borderRight: "1px solid #E0E0E0"
      }
    },
    MuiBox: {
      root: {
        padding: "24px 0px"
      }
    },
    MuiFormGroup: {
      root: {
        flexDirection: "row",
        MuiFormControlLabel: {
          root: {
            marginLeft: "0"
          }
        }
      }
    },
    MuiRadio: {
      root: {
        color: "#cacfe7"
      }
    },
    MuiFormLabel: {
      asterisk: {
        color: "red"
      }
    }
  }
});

function Application(props) {
  return (
    <>
      <div
        style={{ display: props.isLoading ? "block" : "none" }}
        className="sweet-loading"
      >
        <BeatLoader
          className="loader"
          style={{ display: "block", margin: "0 auto", borderColor: "red" }}
          size={20}
          color={"#1ac6ff"}
          loading={true}
        />
      </div>
      <ThemeProvider theme={outerTheme}>
        <ToastContainer closeOnClick hideProgressBar={true} transition={Zoom} />
        <Router>
          <div className="App">
            <Route exact path="/" component={SignIn} />
            <Route path="/App" component={AdminPanel} />
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

// Typechecking With PropTypes
Application.propTypes = {
  isLoading: PropTypes.bool
};

// Map reducer's state as props
const mapStateToProps = state => ({
  isLoading: state.employee.isLoading
});

export default connect(mapStateToProps)(Application);
