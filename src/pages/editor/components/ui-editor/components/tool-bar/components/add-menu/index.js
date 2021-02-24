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
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it';
import { dict, htmlcode, beamer } from '../../../../../../dict'
import ImageUploader from 'react-images-upload';

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

const TextMenuBox = ({ setBox, handleClose }) => (
  <TemplateMenuBox
    name="Text"
    items={
      <>
        <BoxItem
          onClick={() => {
            setBox(null);
            handleClose(null);
          }}
          label="Paragraph Block"
        />
        {Object.keys(htmlcode).map(key =>
          <BoxItem
            onClick={() => {
              setBox(null, `${htmlcode[key].codeStart}${htmlcode[key].codeEnd}`);
              handleClose(null);
            }}
            label={htmlcode[key].name}
          />
        )}
        <Box mb={2} />
        <Typography variant="body1" display="inline">Numbered Section Title </Typography><br />
        <Typography variant="body2" display="inline">(included in the table of contents)</Typography>
        <Divider />
        {Object.keys(dict).map(key =>
          <BoxItem
            onClick={() => {
              setBox(key);
              handleClose(null);
            }}
            label={dict[key].name}
          />
        )}
        <Box mb={2} />
        <Typography variant="body1" display="inline">Unnumbered Section Title</Typography><br />
        <Typography variant="body2" display="inline">(excluded in the table of contents.)</Typography>
        <Divider />
        {Object.keys(dict).map(key =>
          <BoxItem
            onClick={() => {
              setBox(`${key}*`);
              handleClose(null);
            }}
            label={dict[key].name}
          />
        )}
      </>
    }
  />
)

const BeamerMenuBox = ({ setBox, handleClose }) => (
  <TemplateMenuBox
    name="Beamer"
    items={
      <>
        <Typography variant="body1" display="inline">Numbered Section Title </Typography><br />
        <Typography variant="body2" display="inline">(included in the table of contents)</Typography>
        <Divider />
        {Object.keys(beamer).map(key =>
          <BoxItem
            onClick={() => {
              setBox(key);
              handleClose(null);
            }}
            label={beamer[key].name}
          />
        )}
        <Box mb={2} />
        <Typography variant="body1" display="inline">Unnumbered Section Title</Typography><br />
        <Typography variant="body2" display="inline">(excluded in the table of contents.)</Typography>
        <Divider />
        {Object.keys(beamer).map(key =>
          <BoxItem
            onClick={() => {
              setBox(`${key}*`);
              handleClose(null);
            }}
            label={beamer[key].name}
          />
        )}
      </>
    }
  />
)

const equationTemplate = [
  {
    name: "Fraction",
    equation: "\\frac{x}{y} ",
  },
  {
    name: "Script",
    equation: "x^y",
  },
  {
    name: "Radical",
    equation: "\\sqrt x",
  },
  {
    name: "Integral",
    equation: "\\int_{a}^{b} x^2 \\,dx",
  },
  {
    name: "Differentials",
    equation: "\\frac{dx}{dy} 2x ",
  },
  {
    name: "Summation",
    equation: "\\sum_{i=a}^{b} f(i)",
  },
  {
    name: "Products",
    equation: "\\prod_{i=a}^{b} f(i)",
  },
  {
    name: "Limits",
    equation: "\\lim_{x\\to\\infty} f(x)",
  }
]

const EquationMenuBox = ({ setBox, handleClose }) => (
  <TemplateMenuBox
    name="Equation"
    items={
      <>
        {equationTemplate.map((item) => (
          <BoxItem
            onClick={() => {
              setBox(`[\\ ${item.equation} \\]`);
              handleClose(null);
            }}
            label={
              <>
                <Box>
                  <Typography>{item.name}</Typography>
                  <MathpixLoader>
                    <MathpixMarkdown text={`\\( ${item.equation} \\)`} />
                  </MathpixLoader>
                </Box>
              </>
            }
          />
        ))}
      </>
    }
  />
)

const OtherMenuBox = ({ setBox, handleClose }) => (
  <TemplateMenuBox
    name="Command"
    items={
      <>
        <BoxItem
          onClick={() => {
            setBox('maketitle');
            handleClose(null);
          }}
          label="Make Title"
        />
        <BoxItem
          onClick={() => {
            setBox('tableofcontents');
            handleClose(null);
          }}
          label="Table of Contents"
        />
        <BoxItem
          onClick={() => {
            setBox('hrule');
            handleClose(null);
          }}
          label="Divider"
        />
        <BoxItem
          onClick={() => {
            setBox('newpage');
            handleClose(null);
          }}
          label="New Page"
        />
      </>
    }
  />
)


const ImageMenuBox = ({ setBox, handleClose, images }) => {
  
  const onDrop = (val) => {
    //upload image to github

    //rerender the image list
  }

  return (
    <TemplateMenuBox
      name="Images"
      items={
        <>
          {/* upload new image */}
          <ImageUploader
            withIcon={true}
            buttonText='Choose image'
            onChange={() => { }}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
          />

          {/* image list */}
        </>
      }
    />
  )
}

const AddMenu = ({ setBox, handleClose, documentclass }) => {
  const [open, setOpen] = useState('text')
  const theme = useTheme()
  const handleClick = (key) => {
    setOpen(key)
  }

  //control the add menu show what submenu 
  const menu = ['text', 'equation', 'image', 'table', 'command']
  documentclass === "beamer" && menu.splice(1, 0, "beamer");

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
            <TextMenuBox setBox={setBox} handleClose={handleClose} />
          </Box>
          <Box style={{ display: open === 'beamer' ? 'block' : 'none' }}>
            <BeamerMenuBox setBox={setBox} handleClose={handleClose} />
          </Box>
          <Box style={{ display: open === 'equation' ? 'block' : 'none' }}>
            <EquationMenuBox setBox={setBox} handleClose={handleClose} />
          </Box>
          <Box style={{ display: open === 'image' ? 'block' : 'none' }}>
            <ImageMenuBox setBox={setBox} handleClose={handleClose} />
          </Box>
          <Box style={{ display: open === 'command' ? 'block' : 'none' }}>
            <OtherMenuBox setBox={setBox} handleClose={handleClose} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AddMenu