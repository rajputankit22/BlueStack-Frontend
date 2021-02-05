import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { connect } from "react-redux";
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import { fetchAllEmployees } from "../store/actions/adminActions";
import { fetchRoomsList } from "../store/actions/roomActions";

const useStyles = makeStyles((theme) => ({
  NavList: {
    transition: "all 0.3s ease",
    margin: "0px",
    "& a": {
      "& .MuiListItemIcon-root": {
        minWidth: "38px",
      },
      "& svg": {
        transition: "all 0.3s ease",
      },
      "& span": {
        whiteSpace: "nowrap",
        transition: "all 0.3s ease",
      },
      textDecoration: "none",
      "&:hover": {
        "& .MuiListItem-root": {
          background: "transparent",
        },
        textDecoration: "none",
        "& svg": {
          marginLeft: "5px",
        },
        "& span": {
          marginLeft: "5px",
        },
      },
    },
    "& .MuiListItem-root": {
      margin: "3% 0%",
      transition: "all 0.3s ease",
      borderRadius: "0px",
    },
    "& .Mui-selected": {
      background: "#075065",
      borderRadius: "0px",
      "& span": {
        color: "#fff",
        fontWeight: "700",
      },
      "& svg": {
        color: "#fff",
        fontWeight: "700",
      },
      "&:hover": {
        background: "#075065 !important",
        "& svg": {
          marginLeft: "0px",
        },
        "& span": {
          marginLeft: "0px",
        },
      },
    },
  },
}));

function NavList(props) {
  const classes = useStyles();

  return (
    <>
      <List className={classes.NavList}>

        <Link onClick={() => { props.fetchAllEmployees() }} to="/App/AllEmployees">
          <ListItem selected={props.pathname === "/App/AllEmployees" ? true : false} button >
            <ListItemIcon>
              <GroupAddOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>
        </Link>


        <Link onClick={() => { props.fetchRoomsList() }} to="/App/AllRooms">
          <ListItem selected={props.pathname === "/App/AllRooms" ? true : false} button >
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="Rooms" />
          </ListItem>
        </Link>

      </List>
    </>
  );
}

// Typechecking With PropTypes
NavList.propTypes = {
  fetchRoomsList: PropTypes.func,
};


// Map reducer's state as props
const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { fetchAllEmployees, fetchRoomsList })(NavList);
