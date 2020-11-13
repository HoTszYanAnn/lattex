import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'

const ImageStyle = (width, height) => {
  return {
    width,
    height,
    objectFit: "cover"
  }
}

export default class Image extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { src, isSelected, onImageClick, label } = this.props
    return (
      <Box>
        <div className={`responsive${isSelected ? " selected" : ""}`} style={{ marginBottom: '1rem' }}
          onClick={onImageClick}>
          <img src={src}
            className={`thumbnail${isSelected ? " selected" : ""}`}
            style={ImageStyle(150, 150)}
          />
          <div className="checked" style={{ bottom: '25px' }}>
            {/*<img src={imgCheck} style={{ width: 75, height: 75, objectFit: "cover" }}/>*/}
            <div className="icon" />
          </div>
          <Typography align="center">{label}</Typography>
        </div>
      </Box>
    )
  }
}

Image.propTypes = {
  src: PropTypes.string,
  isSelected: PropTypes.bool
}