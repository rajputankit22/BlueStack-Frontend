import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FormControl, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Tooltip from "@material-ui/core/Tooltip";
import { updateProfile, fetchEmployeeById } from "../../store/actions/adminActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import _ from "underscore";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MyTextField = withStyles({
  root: {
    "& input + fieldset": {
      borderColor: "#54505d",
    },
    "& label": {
      color: "#2b335e",
    },
    "& input": {
      color: "#000",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #cacfe7",
    },
  },
})(TextField);

const styles = (theme) => ({
  Paper: {
    boxShadow: "0 2px 18px 1px rgba(49,53,72,.1)",
    padding: "6% 8%",
  },
  Grid: {
    padding: "15px 24px !important",
  },
  title: {
    fontWeight: "bold",
  },
  TitleGrid: {
    padding: "50px 24px 0px 24px !important",
    "& div": {
      display: "inline-flex",
    },
    "& svg": {
      color: "#2c343b",
      marginRight: "10%",
    },
    "& h6": {
      color: "#2c343b",
      whiteSpace: "nowrap",
    },
  },
  df: {
    flex: "auto",
    "& h5": {
      color: "rgba(44, 52, 59, 0.8509803921568627)",
      fontWeight: "600",
      marginBottom: "2%",
    },
    "& span": {
      color: "#8a8f94",
      fontWeight: "600",
    },
  },
  toolbar: {
    paddingLeft: "0",
    paddingRight: "0",
  },
  SubmitBtn: {
    marginRight: "1%",
  },
});

class EditEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empId: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
      employeeId: "",
      departmentsEnum: ["Admin", "Management", "Android Team", "iSO Team", "QA", "Engg", "Product"],
      departments: "",
      positionEnum: ["CEO", "CTO", "CFO", "VP", "Principal", "Director Engg", "Director QA", "Manager", "Designer", "Developer", "Lead Developer", "iSO Developer"],
      position: "",
      empType: "",
      adminAccess: false,
      enggManagerAccess: false,
      officeManagerAccess: false,
      employeeAccess: false,
    };
  }

  componentWillReceiveProps(nextProps, prevProps) {
    this.setState({
      empId: nextProps.employeeData._id,
      FirstName: nextProps.employeeData.firstName,
      LastName: nextProps.employeeData.lastName,
      Email: nextProps.employeeData.email,
      Mobile: nextProps.employeeData.mobile,
      employeeId: nextProps.employeeData.employeeId,
      position: nextProps.employeeData.position,
      departments: nextProps.employeeData.departments,
      empType: nextProps.employeeData.ACL.adminAccess ? "adminAccess" : nextProps.employeeData.ACL.enggManagerAccess ? "enggManagerAccess" : nextProps.employeeData.ACL.officeManagerAccess ? "officeManagerAccess" : nextProps.employeeData.ACL.employeeAccess ? "employeeAccess" : "",
      ...nextProps.employeeData.ACL,
    });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  AclOnChange = event => {
    if (event.target.value === "adminAccess") {
      this.setState({
        empType: "adminAccess",
        adminAccess: true,
        enggManagerAccess: false,
        officeManagerAccess: false,
        employeeAccess: false,
      });
    } else if (event.target.value === "enggManagerAccess") {
      this.setState({
        empType: "enggManagerAccess",
        adminAccess: false,
        enggManagerAccess: true,
        officeManagerAccess: false,
        employeeAccess: false,
      });
    } else if (event.target.value === "officeManagerAccess") {
      this.setState({
        empType: "officeManagerAccess",
        adminAccess: false,
        enggManagerAccess: false,
        officeManagerAccess: true,
        employeeAccess: false,
      });
    } else if (event.target.value === "employeeAccess") {
      this.setState({
        empType: "employeeAccess",
        adminAccess: false,
        enggManagerAccess: false,
        officeManagerAccess: false,
        employeeAccess: true,
      });
    }
  }

  ResetForm = () => {
    this.setState({
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
      Password: "",
      employeeId: "",
      ConfirmPassword: "",
      departments: "",
      position: "",
      empType: "",
      adminAccess: false,
      enggManagerAccess: false,
      officeManagerAccess: false,
      employeeAccess: false,
      passError: false,
      passErrorText: "",
    });
  };

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  SubmitForm = (e) => {
    e.preventDefault();
    const employee = {
      _id: this.state.empId,
      firstName: this.state.FirstName,
      lastName: this.state.LastName,
      email: this.state.Email,
      mobile: this.state.Mobile,
      employeeId: this.state.employeeId,
      departments: this.state.departments,
      position: this.state.position,
      ACL: {
        adminAccess: this.state.adminAccess,
        enggManagerAccess: this.state.enggManagerAccess,
        officeManagerAccess: this.state.officeManagerAccess,
        employeeAccess: this.state.employeeAccess,
      }
    };
    this.props.updateProfile(employee);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper elevation={0} className={classes.Paper} variant="outlined">
          <form onSubmit={this.SubmitForm}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Grid container spacing={6}>
                  <Grid className={classes.Grid} xs={12} item>
                    <Toolbar className={classes.toolbar}>
                      <div className={classes.df}>
                        <Typography color="secondary" variant="h5">
                          Employee Update Form
                        </Typography>
                      </div>
                      <Tooltip title="Reset Form">
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          size="medium"
                          onClick={this.ResetForm}
                        >
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                    </Toolbar>
                  </Grid>
                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <PersonOutlineIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Personal Info
                      </Typography>
                    </div>
                    <hr />
                  </Grid>
                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        variant="standard"
                        value={this.state.FirstName}
                        id="FirstName"
                        type="text"
                        label="First Name"
                        name="FirstName"
                        onChange={this.onChange}
                        size="small"
                        inputProps={{
                          maxLength: 50,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.LastName}
                        id="LastName"
                        type="text"
                        label="Last Name"
                        name="LastName"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 50,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <CallOutlinedIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Contact Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.Email}
                        id="Email"
                        label="Email Id"
                        name="Email"
                        type="email"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 50,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.Mobile}
                        id="Mobile"
                        label="Mobile Number"
                        name="Mobile"
                        type="number"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 10,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <FeaturedPlayListOutlinedIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Onboarding Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.employeeId}
                        id="employeeId"
                        disabled
                        label="Employee Id"
                        name="employeeId"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 3,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl required fullWidth margin="none">
                      <InputLabel id="demo-mutiple-checkbox-label">
                        Department
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="departments"
                        required
                        name="departments"
                        value={this.state.departments}
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                      >
                        {this.state.departmentsEnum.map(name => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl required fullWidth margin="none">
                      <InputLabel id="demo-mutiple-checkbox-label">
                        Position
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="position"
                        required
                        name="position"
                        value={this.state.position}
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                      >
                        {this.state.positionEnum.map(name => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <LockOutlinedIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Access Control Logic
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl required component="fieldset">
                      <RadioGroup
                        aria-label="ACL"
                        name="ACL"
                        value={this.state.empType}
                        onChange={this.AclOnChange}
                      >
                        <FormControlLabel
                          value="adminAccess"
                          name="adminAccess"
                          control={<Radio />}
                          label="Admin Access"
                        />
                        <FormControlLabel
                          value="enggManagerAccess"
                          name="enggManagerAccess"
                          control={<Radio />}
                          label="Engg Manager Access"
                        />
                        <FormControlLabel
                          value="officeManagerAccess"
                          name="officeManagerAccess"
                          control={<Radio />}
                          label="Office Manager Access"
                        />
                        <FormControlLabel
                          value="employeeAccess"
                          name="employeeAccess"
                          control={<Radio />}
                          label="Employee Access"
                        />

                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid align="right" className={classes.Grid} xs={12} item>
                    <Link className={classes.SubmitBtn} to="/App/AllEmployees">
                      <Button
                        color="secondary"
                        type="submit"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </Link>
                    <Button color="primary" type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    );
  }
}

// Typechecking With PropTypes
EditEmployee.propTypes = {
  fetchEmployeeById: PropTypes.func,
  updateProfile: PropTypes.func,
  employeeData: PropTypes.object
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  employeeData: state.admin.employee,
});

export default connect(mapStateToProps, {
  fetchEmployeeById,
  updateProfile,
})(withStyles(styles)(EditEmployee));
