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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CommandBlock from './components/command-block'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

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
    newArr.push({ code: '\\section', text: '' })
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
      <Box style={{ overflowY: 'scroll', height: '100%' }}>
        <Box
          style={{
            boxSizing: 'border-box',
            padding: '1.5em',
            margin: '1.5em',
            marginTop: '3em',
            background: 'white',
            minHeight: 'calc(100% - 3em)',
            width: 'calc(100% - 3em)',
          }}
        >

          <DragDropContext
            onDragEnd={result => {
              console.log(result);
              const { source, destination, draggableId } = result;
              if (!destination) {
                return;
              }

              let arr = _.cloneDeep(state);
              console.log(arr);
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
                            {item.code
                              ? dict[item.code]
                                ? <TextTitle key={item.id + 'title'} info={dict[item.code]} text={item.text} setText={setText} id={id} />
                                : <CommandBlock key={item.id + 'cmdBk'} text={item.code} id={item.id} />
                              : <TextContent key={item.id + 'content'} text={item.text} setText={setText} id={id} />
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
          {/*
            state.map((item, id) => (
              item.code
                ? dict[item.code]
                  ? <TextTitle key={id} info={dict[item.code]} text={item.text} setText={setText} id={id} />
                  : <CommandBlock text={item.code} id={id} />
                : <TextContent key={id} text={item.text} setText={setText} id={id} />
            ))
            */
          }
          {console.log(state)}
          <Button onClick={addTextBox}>Add Section</Button>
          <Button onClick={addParaBox}>Add Para</Button>
        </Box>
      </Box>
    </>
  )
}

export default UIEditor