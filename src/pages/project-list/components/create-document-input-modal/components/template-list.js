import React from 'react'
import ImagePicker from '../../../../../components/ImagePicker'
import 'react-image-picker/dist/index.css'
import { templateList } from './config'
import { Box } from '@material-ui/core'

const TemplateList = ({ template, setTemplate }) => {

  return (
    <>
      <Box style={{ height: '60vh', overflowY: 'auto', overflowX: 'hidden' }}>
        <ImagePicker
          images={templateList.map((item) => ({ src: item.image, value: item }))}
          onPick={({value}) => setTemplate(value)}
          currentValue={template}
        />
      </Box>
    </>
  )
}

export default TemplateList