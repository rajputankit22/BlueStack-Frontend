import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import { Link, Switch, Redirect } from "react-router-dom";
import AllEmployees from "../Pages/Employees";
import AddEmployee from "../Pages/Employees/addEmployee";
import UpdateEmployee from "../Pages/Employees/updateEmployee";
import AllRooms from "../Pages/Rooms";
import CreateRoom from "../Pages/Rooms/addRoom";
import UpdateRoom from "../Pages/Rooms/updateRoom";
import { connect } from "react-redux";
import PrivateRoute from "../helper/privateRoutes";
import Hidden from "@material-ui/core/Hidden";
import { signOut } from "../store/actions/employeeActions";
import NavList from "./navList";
import { fetchAllEmployees } from "../store/actions/adminActions";
import { fetchRoomsList } from "../store/actions/roomActions";
import { loadEmployee, refreshToken } from "../store/actions/employeeActions";
import { Footer } from "../Components/Footer/Footer";


const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#075065",
    color: "#000",
    boxShadow: "0 2px 30px 2px rgba(0,0,0,.1)",
    [theme.breakpoints.up("sm")]: {
      width: `100%`,
      marginLeft: drawerWidth,
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 30px 2px",
    backgroundColor: "#fff",
    width: drawerWidth,
    borderRight: "none",
    zIndex: "1000",
    "& svg": {
      color: "#075065",
    },
    "& span": {
      color: "#075065",
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },

  logo: {
    transform: "translateY(5%)",
    width: 45,
  },
  logoMobile: {
    transform: "translateY(11%)",
    margin: "6px 9px 3px 9px",
  },
  flex: {
    flexGrow: 1,
  },
  ProfileButton: {
    borderRadius: "10px",
    "& h6": {
      marginRight: "10%",
      color: "#fff",
      fontWeight: "700",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  avatar: {
    width: "30px",
    height: "30px",
    backgroundColor: "#1ac6ff",
  },
  Menu: {
    "& .MuiList-root": {
      padding: 0,
    },
    "& .MuiMenuItem-root": {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
    "& .MuiListItem-root": {
      "&:hover": {
        "& svg": {
          color: "#1ac6ff",
        },
      },
    },
    "& svg": {
      marginRight: "10px",
      marginTop: "-1px",
    },
  },
  padding: {
    minHeight: "85vh",
  },
  Pages: {
    padding: theme.spacing(3),
    overflow: "auto",
    paddingBottom: "78px !important",
  },
  Footer: {
    borderTop: "1px solid #E4E7ED",
    backgroundColor: "#fff",
    boxShadow: "1px 0 20px rgba(0,0,0,.1)",
    padding: theme.spacing(2, 3),
    "& h6": {
      color: "#57656d",
    },
    "& a": {
      color: "#075065",
      fontWeight: "600",
    },
  },
  Links: {
    color: "#000",
  },
});

class PermanentDrawerLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileOpen: false,
      navbarName: "",
      navbarInitial: "",
      mail: "",
      ACL: {}
    };
  }

  async componentDidMount() {
    await this.props.loadEmployee();
    await this.props.fetchAllEmployees();
  }

  componentWillReceiveProps(nextProps, prevProps) {
    let employee = JSON.parse(localStorage.getItem("User_data"));
    if (employee) {
      this.setState({
        navbarName: employee.firstName + " " + employee.lastName,
        navbarInitial: employee.firstName.charAt(0).toUpperCase(),
        fullName: employee.firstName,
        position: employee.position,
        mail: employee.email,
        ACL: { ...employee.ACL }
      });
    }
    if (
      nextProps.tokenExpired &&
      nextProps.tokenExpired !== this.props.tokenExpired
    ) {
      this.props.refreshToken();
    }
  }

  handleDrawerToggle = () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    });
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  SignOut = () => {
    this.props.signOut();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.flex} variant="h6" noWrap style={{ marginLeft: 50 }}>
              <Button variant="contained" color="primary">
                BlueStack
              </Button>
            </Typography>
            <div>
              <span style={{ color: "white" }}>{this.state.fullName} &nbsp; &nbsp; {this.state.ACL.adminAccess ? "adminAccess" : this.state.ACL.enggManagerAccess ? "enggManagerAccess" : this.state.ACL.officeManagerAccess ? "officeManagerAccess" : this.state.ACL.employeeAccess ? "employeeAccess" : ""}</span>
              <IconButton
                className={classes.ProfileButton}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={this.handleClick}
                size="medium"
              >
                <Button variant="contained" color="primary" onClick={this.SignOut}>
                  LogOut
                </Button>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              variant="temporary"
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="left"
              ModalProps={{
                keepMounted: true,
              }}
            >
              <NavList pathname={window.location.pathname} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <div
                style={{
                  background: "#075065",
                  boxShadow: "0 2px 30px 2px rgba(0,0,0,.1)",
                }}
                align="center"
                className={classes.toolbar}
              >
              </div>
              <NavList pathname={window.location.pathname} />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.padding}>
            <div className={classes.Pages}>
              <Switch>
                <PrivateRoute path="/App/AllEmployees" component={AllEmployees} />
                <PrivateRoute path="/App/AddEmployee" component={AddEmployee} />
                <PrivateRoute path="/App/UpdateEmployee" component={UpdateEmployee} />
                <PrivateRoute path="/App/AllRooms" component={AllRooms} />
                <PrivateRoute path="/App/CreateRoom" component={CreateRoom} />
                <PrivateRoute path="/App/UpdateRoom" component={UpdateRoom} />
              </Switch>
            </div>
          </div>

          <div className={classes.Footer}>
            <Footer />
          </div>
        </main>
        {!this.props.isAuthenticated && <Redirect to="/" />}
      </div>
    );
  }
}

// Typechecking With PropTypes
PermanentDrawerLeft.propTypes = {
  isLoading: PropTypes.bool,
  fetchAllEmployees: PropTypes.bool,
  fetchRoomsList: PropTypes.func,
};

// mapStateToProps is used for selecting the part of the data from the store that the connected component needs.
const mapStateToProps = (state) => ({
  isLoading: state.employee.isLoading,
  isAuthenticated: state.employee.isAuthenticated,
  tokenExpired: state.employee.tokenExpired,
});

export default connect(mapStateToProps, {
  signOut,
  loadEmployee,
  refreshToken,
  fetchAllEmployees,
  fetchRoomsList,
})(withStyles(styles)(PermanentDrawerLeft));
