import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Button,
  makeStyles,
  Tooltip,
  Fab
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'

import ToolBar from './components/tool-bar'
import TextTitle from './components/text-title'
import CommandBlock from './components/command-block'
import ContentBlock from './components/content-block'
import EquationBlock from './components/equation-block'

import { dict, htmlcode, beamer } from '../../dict'

//equation https://www.npmjs.com/package/equation-editor-react
//rte 
const useStyles = makeStyles((theme) => ({
  toolbar: {
    position: 'fixed',
    top: '60px',
    left: '10px',
    zIndex: 999,
  },
}));
const UIEditor = ({ doc, showCompiler, changeShowCompiler, pushAndCompile, updateDocument, width }) => {
  const classes = useStyles()
  const origContent = _(doc.latex).pick(['contents']).value().contents
  const [state, setState] = useState(origContent)

  const setText = (id, val) => {
    if (state[id].text !== val) {
      let newArr = _.cloneDeep(state)
      newArr[id].text = val
      setState(newArr)
    }
  }

  const setCode = (id, val) => {
    if (state[id].code !== val) {
      let newArr = _.cloneDeep(state)
      newArr[id].code = val
      setState(newArr)
    }
  }

  const setBox = (code, content) => {
    let newArr = _.cloneDeep(state)
    newArr.push({ id: uuidv4(), code: code, text: content ? content : '' })
    setState(newArr)
  };

  const onSave = () => {
    pushAndCompile({ contents: state })
  }

  const removeItemBlock = (id) => {
    let newArr = _.cloneDeep(state)
    newArr.splice(id, 1)
    setState(newArr)
  }

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
          onSave={onSave}
        />
      </Box>
      <Box
        style={{
          position: 'absolute',
          top: 60,
          left: showCompiler
            ? ['xs', 'sm', 'md'].includes(width)
              ? 'calc(100vw - 10px - 16px)'
              : 'calc(50vw - 10px - 16px)'
            : 'calc(100vw - 10px - 16px)',
          transform: "translateX(-100%)",
          zIndex: 500
        }}
      >
        <Tooltip title="Recompile" aria-label="Recompile" placement="top">
          <Fab size="medium" onClick={onSave} color="primary"><SaveIcon style={{ color: 'white' }} /></Fab>
        </Tooltip>
      </Box>
      <Box style={{ overflowY: 'scroll', height: '100%' }}>
        <Box
          style={{
            boxSizing: 'border-box',
            padding: '1.5em',
            margin: '2em',
            background: 'white',
            minHeight: 'calc(100% - 3em)',
            width: 'calc(100% - 3em - 16px)',
          }}
        >
          <DragDropContext
            onDragEnd={result => {
              const { source, destination, draggableId } = result;
              if (!destination) {
                return;
              }

              let arr = _.cloneDeep(state);
              const [remove] = arr.splice(source.index, 1);
              arr.splice(destination.index, 0, remove);
              setState(arr);
            }}
          >
            <Droppable droppableId="d">
              {provided => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {
                    state.map((item, id) => (
                      <Draggable draggableId={id.toString()} index={id}>
                        {p => (
                          <Box
                            ref={p.innerRef}
                            {...p.draggableProps}
                            key={item.id + 'box'}
                            className="editor-big-block"
                          >
                            <Box {...p.dragHandleProps} className="editor-block-handler" >
                              <UnfoldMoreIcon />
                            </Box>
                            <button onClick={() => removeItemBlock(id)} className="editor-block-deleter" >
                              <DeleteIcon />
                            </button>
                            {item.code
                              ? beamer[item.code]
                                ? <TextTitle key={item.id + 'title'} info={beamer[item.code]} text={item.text} setText={setText} id={id} />
                                : beamer[item.code.slice(0, -1)]
                                  ? <TextTitle key={item.id + 'title'} info={beamer[item.code.slice(0, -1)]} star text={item.text} setText={setText} id={id} />
                                  : dict[item.code]
                                    ? <TextTitle key={item.id + 'title'} info={dict[item.code]} text={item.text} setText={setText} id={id} />
                                    : dict[item.code.slice(0, -1)] || beamer[item.code.slice(0, -1)]
                                      ? <TextTitle key={item.id + 'title'} info={dict[item.code.slice(0, -1)]} star text={item.text} setText={setText} id={id} />
                                      : item.code.startsWith('[') && item.code.endsWith(']')
                                        ? <EquationBlock key={item.id + 'equationBlk'} code={item.code.slice(1, -2)} setCode={setCode} id={id} />
                                        : <CommandBlock key={item.id + 'cmdBlk'} text={item.code} id={id} />
                              : _.findKey(htmlcode, code => item.text.startsWith(code.codeStart))
                                ? <ContentBlock key={item.id + 'content'} text={item.text} setText={setText} id={id} htmlcode={htmlcode[_.findKey(htmlcode, code => item.text.startsWith(code.codeStart))]} />
                                : <ContentBlock key={item.id + 'content'} text={item.text} setText={setText} id={id} />
                            }
                          </Box>
                        )}
                      </Draggable>
                    ))
                  }
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>
    </>
  )
}

export default UIEditor