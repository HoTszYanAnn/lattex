import React, { useState } from 'react';
import {
    ExpandMore,
    ExpandLess,
} from '@material-ui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {
    List,
    ListItem,
    ListItemIcon,
    Collapse,
    ListItemText,
    Tooltip,
    ListSubheader,
  } from '@material-ui/core';
import dict from '../../../../dict.json'

const AddBox = ({setBox}) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
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
        <Tooltip title="Add" placement="top">
        <List disablePadding>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <AddBoxIcon />
                </ListItemIcon>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding style={{
                    backgroundColor: '#FFFFFF', 
                    zIndex: '1', 
                    overflow: 'auto',
                    maxHeight: 500,
                }}>
                    <ListItem button onClick={()=>addBox(null)}>
                        <ListItemText primary="Text"/>
                    </ListItem>
                    {Object.keys(dict).map((key) => {
                        return(<ListItem button onClick={()=>addBox(key)}>
                                <ListItemText primary={dict[key].name}/>
                            </ListItem>)})
                    }       
                </List>
            </Collapse>
        </List>
        </Tooltip>
        </>
        );
    }

export default AddBox
