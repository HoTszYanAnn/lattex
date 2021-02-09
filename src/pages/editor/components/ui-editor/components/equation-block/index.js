import React, { useState } from 'react'
import EquationEditor from "equation-editor-react";
import { Box, Button } from '@material-ui/core';
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it';
import { v4 as uuidv4 } from 'uuid';
import { equationTools } from './config.js'

const EquationBlock = ({ code, setCode, id }) => {
  const [equation, setEquation] = useState(code);
  const [key, setKey] = useState(uuidv4())
  const [menu, setMenu] = useState(-1)

  const setOpenMenu = (val) => {
    setMenu(val)
  }

  const setCloseMenu = (val) => {
    setMenu(-1)
  }

  const onChange = (val) => {
    setEquation(val)
  }

  const onAdd = (val) => {
    setEquation(equation + ' ' + val)
    setCode(id, '[' + equation + val + '\\]')
    setKey(uuidv4)
  }

  const onBlur = (val) => {
    setCode(id, '[' + equation + '\\]')
  }
  return (
    <>
      <Box className="equation-block" textAlign='center'>
        <Box className="equation-block-content" onBlur={onBlur} key={key}>
          <EquationEditor
            value={equation}
            onChange={onChange}
            autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
            autoOperatorNames="sin cos tan"
          />
        </Box>
        <Box className="equation-block-tool-bar">
          {equationTools.map((item, index) => (
            <Button className="equation-block-tool-bar-button-box control-item button" disableRipple={true} data-title={item.title} onMouseEnter={() => setOpenMenu(index)} onMouseLeave={() => setCloseMenu(index)} >
              <MathpixLoader>
                <Box className="latex-equation-display-button">
                  <MathpixMarkdown text={`\\( ${item.code} \\)`} display="inline-block" className="latex-equation-display-button" />
                </Box>
              </MathpixLoader>
              <Box style={{ display: menu === index ? 'block' : 'none' }} className="equation-block-tool-bar-submenu">
                {item.buttonArray.map(subitem => (
                  <Button className="control-item button" disableRipple={true} data-title={subitem.title} onClick={() => onAdd(subitem.code)} >
                    <MathpixLoader>
                      <Box className="latex-equation-display-button">
                        <MathpixMarkdown text={`\\( ${subitem.code} \\)`} display="inline-block" className="latex-equation-display-button" />
                      </Box>
                    </MathpixLoader>
                  </Button>
                ))}
              </Box>
            </Button>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default EquationBlock