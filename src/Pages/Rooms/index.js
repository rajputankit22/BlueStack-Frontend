import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import BorderColorOutlinedIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import { fetchRoom, removeRoom } from "../../store/actions/roomActions";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from "underscore";

const styles = (theme) => ({
  TopBar: {
    padding: "2% 0",
    display: "flex",
    "& div": {
      display: "flex",
      flex: 1,
    },
    "& h5": {
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#464855",
      padding: "6px 24px 8px 0",
      margin: "0 24px 0 0",
    },
    "& h6": {
      margin: "1% 0",
      fontWeight: "400",
      color: "rgb(30, 159, 242)",
    },
  },
  EmpCard: {
    cursor: "pointer",
    position: "relative",
    padding: "14% 0%",
    "& h6": {
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#075065",
    },
    "&:hover": {
      boxShadow:
        "0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)",
    },
  },
  avatar: {
    marginBottom: "5%",
    backgroundColor: "#1ac6ff",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  EditBtn: {
    color: "#1ac6ff",
    position: "absolute",
    top: "5px",
    right: "5px",
  },
});

class Employee extends Component {
  state = {
    access: false,
    ACL: {}
  };

  componentWillReceiveProps(nextProps, prevProps) {
    let employee = JSON.parse(localStorage.getItem("User_data"));
    if (employee) {
      this.setState({
        ACL: { ...employee.ACL },
      });
    }
  }

  getMuiTheme = () =>
    createMuiTheme({
      palette: {
        primary: {
          light: "#63CCFF",
          main: "#1ac6ff",
          contrastText: "#fff",
        },
        secondary: {
          main: "#075065",
        },
      },
      overrides: {
        MuiPaper: {
          elevation4: {
            boxShadow: "0 2px 18px 1px rgba(49,53,72,.1)",
            padding: "2% 3% 4% 2%",
          },
        },
        MuiToolbar: {
          root: {
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            textAlign: "left",
            color: "#6b6f82",
            borderBottom: "1px solid #d5f2fb",
          },
        },
        MUIDataTableHeadCell: {
          data: {
            color: "#6b6f82",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            fontSize: "0.9rem",
          },
        },
        MuiTableCell: {
          root: {
            borderBottom: "1px solid #d5f2fb",
          },
        },
        MUIDataTableToolbar: {
          icon: {
            color: "#6b6f82",
          },
        },
      },
    });


  render() {
    let employee = JSON.parse(localStorage.getItem("User_data"))
    const { classes } = this.props;

    const columns = [
      {
        name: "ROOM ID",
        label: "ROOM ID",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Email",
        label: "Email",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Sitting",
        label: "Sitting",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Current Status",
        label: "Current Status",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Actions",
        label: "Actions",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (roomId, tableMeta, updateValue) => {
            return (
              <span style={{ color: "#1e9ff2" }}>
                {(this.state.ACL.adminAccess || this.state.ACL.officeManagerAccess) &&
                  <Link to={"/App/UpdateRoom"} onClick={() => { this.props.fetchRoom(roomId) }}>
                    <Tooltip title="Update Room">
                      <IconButton size="small">
                        <BorderColorOutlinedIcon
                          style={{ color: "#1ac6ff" }}
                          fontSize="inherit"
                        />
                      </IconButton>
                    </Tooltip>
                  </Link>
                }
                {this.state.ACL.adminAccess &&
                  <Tooltip title="Delete Room">
                    <IconButton size="small" onClick={() => { this.props.removeRoom(roomId) }}>
                      <DeleteIcon
                        style={{ color: "#ff0000" }}
                        fontSize="inherit"
                      />
                    </IconButton>
                  </Tooltip>
                }
              </span>
            );
          }
        }
      }
    ];

    const options = {
      responsive: "stacked",
      rowHover: true,
      filter: true,
      viewColumns: true,
      selectableRows: "none",
      filterType: "dropdown",
      downloadOptions: {
        filename: "AllRooms.csv",
        separator: ",",
      },
      textLabels: {
        body: {
          noMatch: this.state.isLoading ? (
            <CircularProgress
              style={{ margin: "2%", color: "#f46523" }}
              size={50}
            />
          ) : (
              this.state.showMessage
            ),
          toolTip: "Sort",
        },
        toolbar: {
          search: "Search by Room Id",
          downloadCsv: "Download CSV file",
          print: "Print",
          viewColumns: "View Columns",
          filterTable: "Filter Table",
        },
      },
      rowsPerPage: 10,
      pagination: true,
    };
    return (
      <div>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <div className={classes.TopBar}>
            <div>
              <Typography variant="h5">Rooms</Typography>
            </div>
            {(this.state.ACL.adminAccess || this.state.ACL.officeManagerAccess) &&
              <Link to="/App/CreateRoom">
                <Tooltip placement="left" title="Add Room" aria-label="add">
                  <Fab size="small" color="primary" aria-label="add">
                    <PersonAddOutlinedIcon />
                  </Fab>
                </Tooltip>
              </Link>
            }
          </div>

          <MUIDataTable
            data={this.props.allRooms.map((room, index) => {
              return {
                "ROOM ID": room.roomId,
                "Name": room.roomName,
                "Email": room.email,
                "Sitting": room.sitting,
                "Current Status": room.status,
                "Actions": room._id
              };
            })}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

// Typechecking With PropTypes
Employee.propTypes = {
  fetchRoom: PropTypes.func,
  removeRoom: PropTypes.func,
  allRooms: PropTypes.array
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  allRooms: state.room.allRooms
});

export default connect(mapStateToProps, { fetchRoom, removeRoom })(
  withStyles(styles)(Employee)
);
