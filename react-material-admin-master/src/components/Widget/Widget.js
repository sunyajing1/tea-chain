import React, { useState } from "react";
import {
  Paper,
  // IconButton,
  Menu,
  // MenuItem,
  Typography,
} from "@material-ui/core";
// import { MoreVert as MoreIcon } from "@material-ui/icons";
import classnames from "classnames";
// styles
import useStyles from "./styles";

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  ...props
}) {
  var classes = useStyles();

  // local
  var [moreButtonRef] = useState(null);
  var [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <div className={classes.widgetWrapper}>
      <Paper className={classes.paper} classes={{ root: classes.widgetRoot }}>
        <div className={classes.widgetHeader}>
          {header ? (
            header
          ) : (
            <React.Fragment>
              <Typography variant="h5" color="textSecondary">
                {title}
              </Typography>
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
       <Menu
        id="widget-menu"
        open={isMoreMenuOpen}
        anchorEl={moreButtonRef}
        onClose={() => setMoreMenuOpen(false)}
        disableAutoFocusItem
      >
       {/* <MenuItem>
          <Typography>
            <button >添加</button></Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Copy</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Delete</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Print</Typography>
        </MenuItem> */}
      </Menu>
    </div>
  );
}
