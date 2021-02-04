import React from "react";
import Typography from "@material-ui/core/Typography";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <a href="#">
        <i>BlueStack Pvt Ltd.</i>
      </a>
    </Typography>
  );
};
