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
  } from '@material-ui/core';

const AddBox = ({}) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <>
        <Tooltip title="Add" placement="bottom">
        <List>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <AddBoxIcon />
                </ListItemIcon>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button>
                        <ListItemText primary="Part" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Section" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Subsection" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Paragraph" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="SubParagraph" />
                    </ListItem>
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
