import React, { useEffect } from 'react'
import { Box, Divider } from '@material-ui/core'
import LazyLoad, { forceCheck } from 'react-lazyload';

const Block = ({ images, id, code, text }) => {
  const curr_image = images.find((item) => text.includes(item.name));
  console.log(images)
  console.log(text)

  useEffect(() => {
    forceCheck();
  }, [curr_image])

  return (
    <>
      <Box className="command-block">
        <Box className="command-block-label">Image Block</Box>
        <input
          readonly
          style={{ textAlign: 'center', caretColor: 'transparent', cursor: 'context-menu', background: `url(${curr_image.url}) no-repeat top center`, backgroundSize: 'contain', height: '200px' }}
          className="section-title-field"
        />
      </Box>
    </>
  )
}

export default Block
