import React, { useState } from 'react';
import {
  ExpandMore,
  ExpandLess,
} from '@material-ui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {
  Menu,
  MenuItem,
  Collapse,
  Fab,
  Tooltip,
  MenuSubheader,
} from '@material-ui/core';
import dict from '../../../../../../dict.json'

const AddBox = ({ setBox }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  const addBox = (key) => {
    /*box.push({
        code: key,
        text: ''
    })*/
    setBox({
      code: key,
      text: ''
    })
  }

  return (
    <>
      <Tooltip title="Add" placement="right">
        <Fab onClick={handleClick} size="small">
          <AddBoxIcon />
        </Fab>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'right',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'left',
          horizontal: 'left',
        }}
      >
        <MenuItem button onClick={() => addBox(null)}>
          Text
        </MenuItem>
        {Object.keys(dict).map((key) => {
          return (
            <MenuItem button onClick={() => addBox(key)}>
              {dict[key].name}
            </MenuItem>)
        })
        }
      </Menu>
    </>
  );
}

export default AddBox
