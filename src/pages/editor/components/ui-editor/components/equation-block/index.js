import React, { useState } from 'react'
import EquationEditor from "equation-editor-react";
import { Box, Button } from '@material-ui/core';
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it';
import { v4 as uuidv4 } from 'uuid';

const equationTools = [
  {
    title: 'Super Script',
    code: 'x^y'
  },
  {
    title: 'Fraction',
    code: '\\frac{x}{y}'
  },
  {
    title: 'Sin',
    code: '\\sin{x}'
  },
  {
    title: 'Cos',
    code: '\\cos{x}'
  },
  {
    title: 'Tan',
    code: '\\tan{x}'
  },
]
const EquationBlock = ({ code, setCode, id }) => {
  const [equation, setEquation] = useState(code);
  const [key, setKey] = useState(uuidv4())

  const onChange = (val) => {
    setEquation(val)
    setCode(id, '[' + val + '\\]')
  }

  const onAdd = (val) => {
    setEquation(equation + ' ' + val)
    setCode(id, '[' + equation + val + '\\]')
    setKey(uuidv4)
  }
  return (
    <>
      <Box className="equation-block" textAlign='center'>
        <Box className="equation-block-content" key={key}>
          <EquationEditor
            value={equation}
            onChange={onChange}
            autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
            autoOperatorNames="sin cos tan"
          />
        </Box>
        <Box className="equation-block-tool-bar">
          {equationTools.map(item => (
            <Button className="control-item button" disableRipple={true} data-title={item.title} onClick={() => onAdd(item.code)}>
              <MathpixLoader>
                <Box className="latex-equation-display-button">
                  <MathpixMarkdown text={`\\( ${item.code} \\)`} display="inline-block" className="latex-equation-display-button" />
                </Box>
              </MathpixLoader>
            </Button>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default EquationBlock