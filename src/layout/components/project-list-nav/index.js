import React from 'react'
import {
  Box,
  Link as MuiLink,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  Fab
} from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.primary.main,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: 'white'
  },
  item: {
    color: 'white'
  },
  divider: {
    // Theme Color, or use css color in quote
    background: 'white',
  },
  extendedIcon: {
    marginRight: theme.spacing(2),
  },
}));

const Nav = () => {
  const classes = useStyles();

  return (
    <>
      <Box my={5} /> {/*add button hard code */}
      <Box display="flex" justifyContent="center">
        <Fab variant="extended" size="medium">
          <PublishIcon className={classes.extendedIcon} />
          &nbsp;&nbsp;&nbsp;&nbsp;Import
        </Fab>
      </Box>
      <Box my={3} />
      <Divider variant="middle" classes={{ root: classes.divider }} />
      <Box>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button className={classes.item}>
            <ListItemText primary="My Document" />
          </ListItem>
        </List>
        <Divider variant="middle" classes={{ root: classes.divider }} />
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button className={classes.item}>
            <ListItemText primary="Template" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="All" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Bookmarked" />
          </ListItem>
        </List>
      </Box>
    </>
  )
}

export default Nav