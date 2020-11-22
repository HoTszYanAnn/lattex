import React, {useState} from 'react'
import { 
  Box,
 } from '@material-ui/core'
import TextTitle from './components/text-title'
import dict from '../../dict.json'
import TextContent from './components/text-content'
import _ from 'lodash'

const UIEditor = ({doc, box}) => {
  console.log(box)
  const boxList = []
  boxList.push(box)
  const origContent = _(doc.latex).pick(['contents']).value()
  const [state, setState] = useState(origContent)
  const l = state.contents.length
  const addBox = (id, code, text) => {
    if (code == null)
      return (<TextContent key={id} text={text}/>)
    else return(<TextTitle key={id} info={dict[code]} text={text}/>)
  }

  return (
    <>
    <Box 
      style={{
        boxSizing: 'border-box',
        overflow: 'auto',
        height: '100%',
        padding: '1.5em'
      }} 
    >
      {
        state.contents.map((cont,i) => addBox(i, cont.code, cont.text))
      }
      {
        boxList.map((cont,i) => addBox(i+l, cont.code, cont.text))
      }
    </Box>
    </>
  )
}

export default UIEditor