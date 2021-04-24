import React, { useState, useEffect } from 'react'
import {
  MenuItem,
  Box,
  Button,
  Typography,
  Divider,
  makeStyles,
  LinearProgress
} from '@material-ui/core';
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it';
import { dict, htmlcode, beamer } from '../../../../../../dict'
import ImageUploader from 'react-images-upload';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import ClearIcon from '@material-ui/icons/Clear';
import { v4 as uuidv4 } from 'uuid';

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

const TableNum = ({ value, onChange }) => (
  <>
    <InputNumber 
      style={{ width: '50px', marginTop: '3px' }}
      value={value}
      onChange={onChange}
      defaultValue={3}
      required={true}
      max={10}
      min={1}
      step={1}
    /> 
  </>
)

const TableGenerator = (ntable) => {
  let table = '<p>(Optional) Caption<table><tbody>'
  for(var i=0; i < ntable.nrow; i++) {
    table = table + '<tr>'
    for(var j=0; j < ntable.ncol; j++) {
      table = table + '<td><div></div></td>'
    }
    table = table + '</tr>'
  }
  table = table + '</tbody></table><p>(Optional) Caption</p>'
  return table
}

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

const TextMenuBox = ({ setBox, handleClose, ntable, setNtable }) => (
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
        <BoxItem
          onClick={() => {
            setBox('multicols-2', null);
            handleClose(null);
          }}
          label="Multicolumn Block"
        />
        <Box display='flex'>
          <MenuItem
            button
            onClick={() => {
              const table = TableGenerator(ntable)
              setBox('table', table);
              handleClose(null);
            }}
            style={{width: '145px'}}
          >
            Table
          </MenuItem>
          <TableNum
            value={ntable.nrow}
            onChange={(val) => {
              setNtable({nrow:val,ncol:ntable.ncol})
            }}/>
          <ClearIcon fontSize='small' style={{paddingTop: '6px'}}/>
          <TableNum
            value={ntable.ncol} 
            onChange={(val) => {
              setNtable({nrow:ntable.nrow,ncol:val})
            }}/>
        </Box>
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
        <BoxItem
          onClick={() => {
            setBox('end');
            handleClose(null);
          }}
          label="End"
        />
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
    equation: "\\int_{a}^{b}{x^2}dx",
  },
  {
    name: "Differential",
    equation: "\\frac{dx}{dy} 2x ",
  },
  {
    name: "Summation",
    equation: "\\sum_{i=a}^{b} f(i)",
  },
  {
    name: "Product",
    equation: "\\prod_{i=a}^{b} f(i)",
  },
  {
    name: "Limit",
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

const ImageMenuBox = ({ setBox, handleClose, uploadImages, images, loading }) => {

  const template = (name) => `\\begin{figure}[h]
  \\caption{}
  \\centering
  \\includegraphics[width=0.5\\textwidth]{${name}}
  \\end{figure}`

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      uploadImages({
        variables: {
          file_type: 'jpg',
          base64: reader.result,
        }
      })
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  //!!!!! same name will bug
  const onDrop = (val) => {
    //upload image to github
    try{
      if (val.length != 0 || !loading) {
        getBase64(val[0])
      }
    }catch(e){
    }
    //rerender the image list
  }

  return (
    <TemplateMenuBox
      name="Images"
      items={
        <>
          {/* upload new image */}
          <Typography variant="body1" display="inline">Upload </Typography>
          <Divider />
          <ImageUploader
            withIcon={true}
            buttonText='Choose image'
            onChange={onDrop}
            imgExtension={['.jpg', '.png', '.jpeg']}
            maxFileSize={1048576}
            singleImage
            label={'Max file size: 1mb, accepted: jpg|jpeg|png'}
          />
          {loading && <LinearProgress />}
          <Box mb={2} />
          <Typography variant="body1" display="inline">Select </Typography>
          <Divider />
          {/* image list */}
          {images.map(image =>
            <BoxItem
              onClick={() => {
                setBox('figure', template(image.name));
                handleClose(null);
              }}
              label={(
                <>
                  <img src={image.url} alt={image.name} style={{ maxWidth: '250px' }}></img>
                </>
              )}
            />
          )}

        </>
      }
    />
  )
}

const AddMenu = ({ setBox, handleClose, documentclass, images, uploadImages, loading }) => {
  const [open, setOpen] = useState('text')
  const [imageMenuKey, setImageMenuKey] = useState(uuidv4())
  const [ntable,setNtable] = useState({nrow: 3, ncol:3})


  const handleClick = (key) => {
    setOpen(key)
  }

  //control the add menu show what submenu 
  const menu = ['text','image','equation','command']
  documentclass === "beamer" && menu.splice(1, 0, "beamer");
  if(documentclass === "report"||documentclass === "book"){
    dict["chapter"] = {
      "name": "Chapter",
      "left": "",
      "size": "1.45rem",
      "weight": "bold"
    };
  } 
  if(documentclass === "article" || documentclass === "beamer"){
    delete dict.chapter
  }

  useEffect(() => {
    setImageMenuKey(uuidv4())
  }, [images])

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
            <TextMenuBox setBox={setBox} handleClose={handleClose} ntable={ntable} setNtable={setNtable}/>
          </Box>
          <Box style={{ display: open === 'beamer' ? 'block' : 'none' }}>
            <BeamerMenuBox setBox={setBox} handleClose={handleClose} />
          </Box>
          <Box style={{ display: open === 'equation' ? 'block' : 'none' }}>
            <EquationMenuBox setBox={setBox} handleClose={handleClose} />
          </Box>
          <Box style={{ display: open === 'image' ? 'block' : 'none' }} key={imageMenuKey}>
            <ImageMenuBox setBox={setBox} handleClose={handleClose} images={images} uploadImages={uploadImages} loading={loading} />
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