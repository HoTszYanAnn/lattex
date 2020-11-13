import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import 'react-image-picker/dist/index.css'
import Image from './image'
import { Grid } from '@material-ui/core'

//ref from https://github.com/bagongkia/react-image-picker
class ImagePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picked: Map()
    }
    this.handleImageClick = this.handleImageClick.bind(this)
    this.renderImage = this.renderImage.bind(this)
  }

  handleImageClick(image) {
    const { multiple, onPick } = this.props
    const pickedImage = multiple ? this.state.picked : Map()
    const newerPickedImage =
      pickedImage.has(image.value) ?
        pickedImage.delete(image.value) :
        pickedImage.set(image.value, image.src)

    this.setState({ picked: newerPickedImage })

    const pickedImageToArray = []
    newerPickedImage.map((image, i) => pickedImageToArray.push({ src: image, value: i }))

    onPick(multiple ? pickedImageToArray : pickedImageToArray[0])
  }

  renderImage(image, currentValue, i) {
    return (
      <>
        <Image
          src={image.src}
          label={image.value.name}
          isSelected={image.value === currentValue}
          onImageClick={() => this.handleImageClick(image)}
          key={i}
        />
      </>
    )
  }

  render() {
    const { images, currentValue } = this.props
    return (
      <Grid container justify="center" className="image_picker" spacing={4}>
        <Grid item>
          {images.map((image, i) => this.renderImage(image, currentValue, i))}
        </Grid>
      </Grid>
    )
  }
}

ImagePicker.propTypes = {
  images: PropTypes.array,
  multiple: PropTypes.bool,
  onPick: PropTypes.func,
  currentValue: PropTypes.object,
}

export default ImagePicker