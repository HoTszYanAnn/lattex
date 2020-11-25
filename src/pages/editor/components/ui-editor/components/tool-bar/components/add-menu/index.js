import React, { useState } from 'react'
import {
  List,
  Menu,
  MenuItem,
  Collapse,
  Fab,
  Tooltip,
  MenuSubheader,
  ListItem,
  Box,
  ThemeProvider,
  useTheme
} from '@material-ui/core';
import dict from '../../../../../../dict.json'


const TextMenu = ({ setBox, handleOpenWindow }) => {
  return (
    <>
      <MenuItem
        button
        onClick={() => {
          setBox(null);
          handleOpenWindow(null);
        }}
      >
        Text
      </MenuItem>
      {Object.keys(dict).map((key) => {
        return (
          <MenuItem
            button
            onClick={() => {
              setBox(key);
              handleOpenWindow(null);
            }}
          >
            {dict[key].name}
          </MenuItem>)
      })
      }
    </>
  )
}

const OtherMenu = ({ setBox, handleOpenWindow }) => {
  return (
    <>
      <MenuItem
        button
        onClick={() => {
          setBox('tableofcontents');
          handleOpenWindow(null);
        }}
      >
        Table of Content
      </MenuItem>
      <MenuItem
        button
        onClick={() => {
          setBox('maketitle');
          handleOpenWindow(null);
        }}
      >
        Title
      </MenuItem>
      <MenuItem
        button
        onClick={() => {
          setBox('newpage');
          handleOpenWindow(null);
        }}
      >
        New Page
      </MenuItem>
      <MenuItem
        button
        onClick={() => {
          setBox('hrule');
          handleOpenWindow(null);
        }}
      >
        Divider
      </MenuItem>
    </>
  )
}

const AddMenu = ({ setBox, handleOpenWindow }) => {
  const [open, setOpen] = useState('text')
  const theme = useTheme()
  const handleClick = (key) => {
    setOpen(key)
  }
  console.log(open)

  const menu = ['text', 'equation', 'list', 'table', 'other']
  return (
    <>
      <Box display="table" style={{ height: '100%', minHeight: '70vh' }}>
        <Box display="table-cell" style={{ verticalAlign: 'top', padding: '0px 10px', backgroundColor: theme.palette.primary.main, height: '100%', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>
          <List>
            {menu.map(item => (
              <ListItem button key={item} onClick={() => handleClick(item)} style={{ textTransform: 'capitalize', color: 'white' }}>
                {item}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box display="table-cell" style={{ verticalAlign: 'top', minWidth: '150px', padding: '15px' }}>
          <Box style={{ display: open === 'text' ? 'block' : 'none' }}>
            <TextMenu setBox={setBox} handleOpenWindow={handleOpenWindow} />
          </Box>
          <Box style={{ display: open === 'other' ? 'block' : 'none' }}>
            <OtherMenu setBox={setBox} handleOpenWindow={handleOpenWindow} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AddMenu