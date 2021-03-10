import React, { useEffect, useState } from 'react'
import { Box, Divider, Button, FormControl, FormGroup, Switch, FormControlLabel } from '@material-ui/core'
import { range } from 'lodash';

const Block = ({ images, id, code, text, setText }) => {
  const curr_image = images.find((item) => text.includes(item.name));
  const [caption, setCaption] = useState('')
  const [menu, setMenu] = useState(null)

  console.log(images)
  console.log(text)

  const arr = text.split('\\').filter(function (el) { return el.length != 0 });
  const need_rmv = arr.findIndex((item) => item.startsWith('textwidth]{'))
  if (need_rmv !== -1) {
    arr[need_rmv - 1] = arr[need_rmv - 1] + '\\' + arr[need_rmv]
    arr.splice(need_rmv, 1);
  }

  if (!arr[0].startsWith('\\')) {
    arr.forEach((item, index) => {
      arr[index] = '\\' + item
    })
  }
  console.log(arr)

  const graphicIndex = arr.findIndex((item) => item.startsWith('\\includegraphics'))
  const alignIndex = arr.findIndex((item) => item.startsWith('\\centering') || item.startsWith('\\raggedright') || item.startsWith('\\raggedleft'))

  const captionIndex = arr.findIndex((item) => item.startsWith('\\caption{'))
  console.log(graphicIndex)
  console.log(captionIndex)
  const captionTop = graphicIndex > captionIndex
  console.log(captionTop)

  const updateCaption = (val) => {
    arr[captionIndex] = `\\caption{${val.target.value}}`
    setText(id, arr.join('\r\n'))
  }

  const changeImageAlign = (val) => {
    if (alignIndex) {
      arr[alignIndex] = `\\${val}`
    } else {
      const newArr = arr.splice(1, 0, '\\${val}')
    }
    setText(id, arr.join('\r\n'))
  }

  const removeCaption = (val) => {
    if (captionIndex !== -1) {
      const newArr = arr.splice(captionIndex, 1)
      setText(id, arr.join('\r\n'))
    }
  }

  const addCaption = (val) => {
    if (captionIndex === -1) {
      const newArr = arr.splice(1, 0, '\\caption{}')
      setText(id, arr.join('\r\n'))
    }
  }

  const changeCaptionPosition = () => {
    if (captionIndex !== -1) {
      console.log(arr)
      const element = arr[captionIndex];
      arr.splice(captionIndex, 1);
      if (captionTop) {
        arr.splice(-1, 0, element);
      } else {
        arr.splice(1, 0, element);
      }
      console.log(arr)
      setText(id, arr.join('\r\n'))
    }
  }

  useEffect(() => {
    if (captionIndex !== -1) {
      setCaption(arr[captionIndex].split(/{|}/)[1])
    }
  }, [text])

  console.log(arr)
  const setOpenMenu = (val) => {
    setMenu(val)
  }

  const setCloseMenu = (val) => {
    setMenu(null)
  }

  console.log(menu)
  return (
    <>
      <Box className="image-block" py={2}>
        <Box>
          <input
            className="image-block-input"
            placeholder="Caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onBlur={updateCaption}
            style={{ display: captionIndex === -1 ? "none" : captionTop ? 'block' : 'none', textAlign: 'center', width: '100%', backgroundColor: 'transparent', fontSize: '15px', padding: '5px 0' }}
          />
          <input
            className="image-block-input"
            readonly
            style={{ 
              textAlign: 'center', 
              caretColor: 'transparent', 
              cursor: 'context-menu', 
              background: `url(${curr_image.url}) no-repeat top`, 
              backgroundSize: 'contain',
              backgroundPosition: `${arr[alignIndex].startsWith('\\raggedright') ? 'left' : arr[alignIndex].startsWith('\\centering') ? 'center' : 'right'}`,
              width: 'calc(100% - 5px)',
              height: '200px' }}
          />
          <input
            className="image-block-input"
            placeholder="Caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onBlur={updateCaption}
            style={{ display: captionIndex === -1 ? "none" : captionTop ? 'none' : 'block', textAlign: 'center', width: '100%', backgroundColor: 'transparent', fontSize: '15px', padding: '5px 0' }}
          />
        </Box>
        <Box className="image-block-tool-bar">
          <CaptionToolBoxButton
            menu={menu}
            setOpenMenu={setOpenMenu}
            setCloseMenu={setCloseMenu}
            captionIndex={captionIndex}
            removeCaption={removeCaption}
            addCaption={addCaption}
            changeCaptionPosition={changeCaptionPosition}
            captionTop={captionTop}
          />
          <Button className="equation-block-tool-bar-button-box control-item button" disableRipple={true} data-title={'Image Align'} onMouseEnter={() => setOpenMenu("imageAlign")} onMouseLeave={setCloseMenu} >
            <Box className="latex-image-display-button">
              <img src="https://img.icons8.com/fluent-systems-regular/20/6a6f7b/align-left.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
            </Box>
            <Box style={{ display: menu === 'imageAlign' ? 'block' : 'none' }} className="image-block-tool-bar-submenu">
              <Button className={arr[alignIndex].startsWith('\\raggedright') ? "control-item button active" : "control-item button"} disableRipple={true} data-title={"Align Left"} onClick={() => changeImageAlign('raggedright')} >
                <Box className="latex-equation-display-button">
                  <img src="https://img.icons8.com/fluent-systems-regular/20/6a6f7b/align-left.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
                </Box>
              </Button>
              <Button className={arr[alignIndex].startsWith('\\centering') ? "control-item button active" : "control-item button"} disableRipple={true} data-title={"Align Center"} onClick={() => changeImageAlign('centering')} >
                <Box className="latex-equation-display-button">
                  <img src="https://img.icons8.com/fluent-systems-regular/20/6a6f7b/align-center.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
                </Box>
              </Button>
              <Button className={arr[alignIndex].startsWith('\\raggedleft') ? "control-item button active" : "control-item button"} disableRipple={true} data-title={"Align Right"} onClick={() => changeImageAlign('raggedleft')} >
                <Box className="latex-equation-display-button">
                  <img src="https://img.icons8.com/fluent-systems-regular/20/6a6f7b/align-right.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
                </Box>
              </Button>
            </Box>
          </Button>
        </Box>
      </Box>
    </>
  )
}

const CaptionToolBoxButton = ({ menu, setOpenMenu, setCloseMenu, captionIndex, removeCaption, addCaption, changeCaptionPosition, captionTop, ...props }) => {
  return (
    <Box {...props}>
      <Button className="equation-block-tool-bar-button-box control-item button" disableRipple={true} data-title={'Caption'} onMouseEnter={() => setOpenMenu('caption')} onMouseLeave={() => setCloseMenu('caption')} >
        <Box className="latex-image-display-button">
          {captionIndex === -1
            ? <img src="https://img.icons8.com/windows/20/6a6f7b/no-chat-message.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
            : <img src="https://img.icons8.com/windows/20/6a6f7b/chat-message.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
          }
        </Box>
        <Box style={{ display: menu === 'caption' ? 'block' : 'none' }} className="image-block-tool-bar-submenu">
          <Button className="control-item button" disableRipple={true} data-title={"Have Caption?"} onClick={() => captionIndex !== -1 ? removeCaption() : addCaption()} >
            <Box className="latex-equation-display-button">
              {captionIndex === -1
                ? <img src="https://img.icons8.com/windows/20/6a6f7b/no-chat-message.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
                : <img src="https://img.icons8.com/windows/20/6a6f7b/chat-message.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
              }
            </Box>
          </Button>
          <Button className="control-item button" disableRipple={true} data-title={"Caption Place?"} onClick={changeCaptionPosition} disabled={captionIndex === -1}>
            <Box className="latex-equation-display-button">
              {captionTop
                ? <img src="https://img.icons8.com/material-outlined/20/6a6f7b/align-cell-content-top.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
                : <img src="https://img.icons8.com/material-outlined/20/6a6f7b/align-cell-content-bottom.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
              }
            </Box>
          </Button>
        </Box>
      </Button>
    </Box>
  )
}
export default Block
