import React, { useState } from 'react'
import {
  MenuItem,
  Box,
  useTheme,
  Button,
  Typography,
  Divider,
  makeStyles
} from '@material-ui/core';
import { dict } from '../../../../../../dict'

const useStyles = makeStyles((theme) => ({
  divider: {
    // Theme Color, or use css color in quote
    background: theme.palette.primary.main,
  },
}));

const BoxItem = ({ label, onClick }) => (
  <>
    <Box>
      <MenuItem
        button
        onClick={onClick}
      >
        {label}
      </MenuItem>
    </Box>
  </>
)

const TemplateMenuBox = ({ name, items }) => (
  <>
    <Box style={{ padding: '8px' }}>
      <Typography variant="h5" color="primary">{name}</Typography>
      <Divider classes={{ root: useStyles().divider }} />
      <Box mb={2} />
      <Box style={{ maxHeight: 'calc(70vh - 30px - 32px - 1px - 16px)', overflowY: "auto" }}>
        {items}
      </Box>
    </Box>
  </>
)

const TextMenuBox = ({ setBox, handleOpenWindow }) => (
  <TemplateMenuBox
    name="Text"
    items={
      <>
        <BoxItem
          onClick={() => {
            setBox(null);
            handleOpenWindow(null);
          }}
          label="Paragraph Block"
        />
        <Box mb={2} />
        <Typography variant="body1" display="inline">Title </Typography>
        <Typography variant="body2" display="inline">(add in table content)</Typography>
        <Divider />
        {Object.keys(dict).map(key =>
          <BoxItem
            onClick={() => {
              setBox(key);
              handleOpenWindow(null);
            }}
            label={dict[key].name}
          />
        )}
        <Box mb={2} />
        <Typography variant="body1" display="inline">Title </Typography>
        <Typography variant="body2" display="inline">(will not add in table content)</Typography>
        <Divider />
        {Object.keys(dict).map(key =>
          <BoxItem
            onClick={() => {
              setBox(`${key}*`);
              handleOpenWindow(null);
            }}
            label={dict[key].name}
          />
        )}
      </>
    }
  />
)
const OtherMenuBox = ({ setBox, handleOpenWindow }) => (
  <TemplateMenuBox
    name="Other"
    items={
      <>
        <BoxItem
          onClick={() => {
            setBox('maketitle');
            handleOpenWindow(null);
          }}
          label="Make Title"
        />
        <BoxItem
          onClick={() => {
            setBox('tableofcontents');
            handleOpenWindow(null);
          }}
          label="Table of Content"
        />
        <BoxItem
          onClick={() => {
            setBox('hrule');
            handleOpenWindow(null);
          }}
          label="Divider"
        />
        <BoxItem
          onClick={() => {
            setBox('newpage');
            handleOpenWindow(null);
          }}
          label="New Page"
        />
      </>
    }
  />
)

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
        <Box display="table-cell" className="menu-leftside-box">
          {menu.map(item => (
            <Button
              key={item}
              onClick={() => handleClick(item)}
              style={{ textTransform: 'capitalize', color: 'white' }}
              className={open === item ? "menu-leftside-button menu-leftside-button-active" : "menu-leftside-button"}
              disableRipple
            >
              {item}
            </Button>
          ))}
        </Box>
        <Box display="table-cell" style={{ verticalAlign: 'top', minWidth: '300px', padding: '7px' }}>
          <Box style={{ display: open === 'text' ? 'block' : 'none' }}>
            <TextMenuBox setBox={setBox} handleOpenWindow={handleOpenWindow} />
          </Box>
          <Box style={{ display: open === 'other' ? 'block' : 'none' }}>
            <OtherMenuBox setBox={setBox} handleOpenWindow={handleOpenWindow} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AddMenu