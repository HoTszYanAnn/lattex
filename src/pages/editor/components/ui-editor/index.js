import React from 'react'
import { 
  Box,
  Container,
 } from '@material-ui/core'
import TextTitle from './components/text-title'
import dict from '../../dict.json'
import TextContent from './components/text-content'

const UIEditor = () => {
  const items=[]
  for (var key in dict) {
    items.push(<TextTitle info={dict[key]}/>)
  }

  return (
    <>
    <Box 
      style={{
        boxSizing: 'border-box',
        overflow: "auto",
        height: '100%',
        padding: '2em'
      }} 
    >
     <TextContent/>
     {items}
     {items}
    </Box>
    </>
  )
}

export default UIEditor