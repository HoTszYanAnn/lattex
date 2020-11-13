import React from 'react'
import ImagePicker from '../../../../../components/ImagePicker'
import 'react-image-picker/dist/index.css'
import { templateList } from './config'

const TemplateList = ({ template, setTemplate }) => {

  return (
    <>
      <ImagePicker
        images={templateList.map((item) => ({ src: item.image, value: item }))}
        onPick={({value}) => setTemplate(value)}
        currentValue={template}
      />
    </>
  )
}

export default TemplateList