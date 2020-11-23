import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Button,
  makeStyles,
} from '@material-ui/core'
import TextTitle from './components/text-title'
import dict from '../../dict.json'
import TextContent from './components/text-content'
import ToolBar from './components/tool-bar'
import _ from 'lodash'

//equation https://www.npmjs.com/package/equation-editor-react
//rte 
const useStyles = makeStyles((theme) => ({
  toolbar: {
    position: 'fixed',
    top: '100px',
    zIndex: 9999,
  },
}));
const UIEditor = ({ doc, showCompiler, changeShowCompiler, pushAndCompile, updateDocument, setBox }) => {
  const classes = useStyles()
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
      <Box className={classes.toolbar}>
        <ToolBar
          showCompiler={showCompiler}
          changeShowCompiler={changeShowCompiler}
          pushAndCompile={pushAndCompile}
          doc={doc}
          updateDocument={updateDocument}
          setBox={setBox}
        />
      </Box>
      <Box
        style={{
          boxSizing: 'border-box',
          overflow: 'auto',
          height: '100%',
          padding: '1.5em',
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