import React, { useState } from 'react'
import EquationEditor from "equation-editor-react";
import { Box } from '@material-ui/core';

const EquationBlock = ({ code, setCode, id }) => {
  const [equation, setEquation] = useState(code);

  const onChange = (val) => {
    setEquation(val)
    setCode(id, '[' + val + '\\]')
  }

  return (
    <>
      <Box className="equation-block" textAlign='center'>
        <EquationEditor
          value={equation}
          onChange={onChange}
          autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
          autoOperatorNames="sin cos tan"
        />
      </Box>
    </>
  )
}

export default EquationBlock