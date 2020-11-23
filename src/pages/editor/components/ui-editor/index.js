import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Button,
} from '@material-ui/core'
import TextTitle from './components/text-title'
import dict from '../../dict.json'
import TextContent from './components/text-content'
import _ from 'lodash'

//equation https://www.npmjs.com/package/equation-editor-react
//rte 

const UIEditor = ({ doc }) => {
  const origContent = _(doc.latex).pick(['contents']).value()
  const [state, setState] = useState(origContent.contents)

  const setText = (id, val) => {
    let newArr = _.cloneDeep(state)
    if (newArr[id].code) {
      newArr[id].text = val
    } else {
      newArr[id].text = val.toString('html')
    }
    setState(newArr)
  }

  const addTextBox = () => {
    let newArr = _.cloneDeep(state)
    newArr.push({ code: '\\section', text: 'aaaaaaaaaaaaaaaa' })
    setState(newArr)
  };

  const addParaBox = () => {
    let newArr = _.cloneDeep(state)
    newArr.push({ code: null, text: '' })
    setState(newArr)
  };

  const l = state.length


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
          state.map((item, id) => (
            item.code
              ? dict[item.code]
                ? <TextTitle key={id} info={dict[item.code]} text={item.text} setText={setText} id={id} />
                : <Box>{item.code}</Box>
              : <TextContent key={id} text={item.text} setText={setText} id={id} />
          ))
        }
        {console.log(state)}
        <Button onClick={addTextBox}>Add Section</Button>
        <Button onClick={addParaBox}>Add Para</Button>
      </Box>
    </>
  )
}

export default UIEditor