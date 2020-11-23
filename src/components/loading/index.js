import React from 'react';
import { WaveTopBottomLoading } from 'react-loadingg';
import { useTheme } from '@material-ui/core';
import { Spring, animated } from 'react-spring/renderprops'

const Container = ({ loading }) => {
  const theme = useTheme()
  console.log(loading)
  return (
    <Spring
      native
      from={{
        top: "50%", left: "50%", transform: 'translate(-50%, -50%)', width: '100vw', height: '100vh', backgroundColor: theme.palette.primary.main, zIndex: 9999, position: 'fixed', opacity: 1
      }}
      to={loading
        ? { top: "50%", left: "50%", transform: 'translate(-50%, -50%)', width: '100vw', height: '100vh', backgroundColor: theme.palette.primary.main, zIndex: 9999, position: 'fixed', opacity: 1 }
        : { top: "50%", left: "50%", transform: 'translate(-50%, -50%)', width: '50vw', height: '50vh', backgroundColor: theme.palette.primary.main, zIndex: 9999, position: 'fixed', opacity: 0 }
      }
      toggle={loading}
    >
      {props => (
        <animated.div style={props} >
          <WaveTopBottomLoading color="white" />
        </animated.div>
      )}
    </Spring >
  )
}
export default Container;