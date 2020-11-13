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

const AddBox = () => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    const items=[]
    for (var key in dict) {
        items.push(<ListItem button>
            <ListItemText primary={key} />
        </ListItem>)
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
                <List component="div" disablePadding style={{
                    backgroundColor: '#FFFFFFFF', 
                    zIndex: '2', 
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 500,
                }}>
                    <ListSubheader>Unnumbered</ListSubheader>
                    {items}
                    <ListSubheader>FrontMatter</ListSubheader>
                    <ListItem button>
                        <ListItemText primary="Title" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Author" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Date" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Abstract" />
                    </ListItem>
                    <ListSubheader>BackMatter</ListSubheader>
                    <ListItem button>
                        <ListItemText primary="Bibliography" />
                    </ListItem>             
                </List>
            </Collapse>
        </List>
        </Tooltip>
        </>
        );
    }

export default AddBox
