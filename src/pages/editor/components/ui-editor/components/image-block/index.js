import React, { useEffect, useState } from 'react'
import { Box, Divider, Button } from '@material-ui/core'
import { range } from 'lodash';

const Block = ({ images, id, code, text, setText }) => {
  const curr_image = images.find((item) => text.includes(item.name));
  const [caption, setCaption] = useState('')

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
  const captionIndex = arr.findIndex((item) => item.startsWith('\\caption{'))
  console.log(graphicIndex)
  console.log(captionIndex)
  const captionTop = graphicIndex > captionIndex
  console.log(captionTop)

  const updateCaption = (val) => {
    arr[captionIndex] = `\\caption{${val.target.value}}`
    setText(id, arr.join('\r\n'))
  }

  useEffect(() => {
    if (captionIndex !== -1) {
      setCaption(arr[captionIndex].split(/{|}/)[1])
    }
  }, [text])

  console.log(arr)
  return (
    <>
      <Box className="image-block">
        <Box>
          <input
            className="image-block-input"
            placeholder="Caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onBlur={updateCaption}
            style={{ display: captionTop ? 'block' : 'none', textAlign: 'center', width: '100%', backgroundColor: 'transparent', fontSize: '15px', padding: '5px 0' }}
          />
          <input
            className="image-block-input"
            readonly
            style={{ textAlign: 'center', caretColor: 'transparent', cursor: 'context-menu', background: `url(${curr_image.url}) no-repeat top center`, backgroundSize: 'contain', width: '100%', height: '200px' }}
          />
          <input
            className="image-block-input"
            placeholder="Caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onBlur={updateCaption}
            style={{ display: captionTop ? 'none' : 'block', textAlign: 'center', width: '100%', backgroundColor: 'transparent', fontSize: '15px', padding: '5px 0' }}
          />
        </Box>
        <Box className="image-block-tool-bar">
          <Button className="equation-block-tool-bar-button-box control-item button" disableRipple={true} data-title={'Caption'} /*onMouseEnter={() => setOpenMenu(index)} onMouseLeave={() => setCloseMenu(index)}*/ >
            <Box className="latex-image-display-button">
              <img src="https://img.icons8.com/small/20/6a6f7b/topic--v1.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
            </Box>
            <Box /*style={{ display: menu === index ? 'block' : 'none' }}*/ style={{ display: 'none' }} className="image-block-tool-bar-submenu">
              {range(0, 5).map(subitem => (
                <Button className="control-item button" disableRipple={true} data-title={subitem.title} /*onClick={() => onAdd(subitem.code)} */>
                  <Box className="latex-equation-display-button">
                    123
                    </Box>
                </Button>
              ))}
            </Box>
          </Button>
          <Button className="equation-block-tool-bar-button-box control-item button" disableRipple={true} data-title={'Align'} /*onMouseEnter={() => setOpenMenu(index)} onMouseLeave={() => setCloseMenu(index)}*/ >
            <Box className="latex-image-display-button">
              <img src="https://img.icons8.com/fluent-systems-regular/20/6a6f7b/align-left.png" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '2px', marginTop: '8px' }} />
            </Box>
            <Box /*style={{ display: menu === index ? 'block' : 'none' }}*/ style={{ display: 'none' }} className="image-block-tool-bar-submenu">
              {range(0, 5).map(subitem => (
                <Button className="control-item button" disableRipple={true} data-title={subitem.title} /*onClick={() => onAdd(subitem.code)} */>
                  <Box className="latex-equation-display-button">
                    123
                    </Box>
                </Button>
              ))}
            </Box>
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Block
