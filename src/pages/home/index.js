import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import { Box, Typography, Grid, useTheme } from '@material-ui/core'
import lattex from '../../assets/logo/lattex.svg';
import equation_4 from '../../assets/home-decorate/equation-4.svg'
import equation_5 from '../../assets/home-decorate/equation-5.svg'
import graphbar from '../../assets/home-decorate/graph-bar.svg'
import './style.css'
import { connect } from "react-redux";

// Little helpers ...
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
const Pink = ({ children }) => <span style={{ color: '#FF6AC1' }}>{children}</span>
const Yellow = ({ children }) => <span style={{ color: '#EFF59B' }}>{children}</span>
const Lightblue = ({ children }) => <span style={{ color: '#9AEDFE' }}>{children}</span>
const Green = ({ children }) => <span style={{ color: '#57EE89' }}>{children}</span>
const Blue = ({ children }) => <span style={{ color: '#57C7FF' }}>{children}</span>
const Gray = ({ children }) => <span style={{ color: '#909090' }}>{children}</span>

const App = () => {
  const reff = React.useRef();
  let parallax = null;
  const theme = useTheme();

  return (
    <>
      <Parallax ref={ref => parallax = ref} pages={1} style={{ backgroundColor: '#F8F8F8' }} className='big-box'>
        <ParallaxLayer offset={0} speed={1} style={{ backgroundColor: theme.palette.primary.main }} />
        <ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />
        {/*
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

        <ParallaxLayer offset={0.7} speed={-0.4} style={{ pointerEvents: 'none' }}>
          <img src={equation_4} style={{ width: '20%', marginLeft: '70%', transform: 'rotate(-5deg)' }} />
        </ParallaxLayer>
        
        <ParallaxLayer offset={0.2} speed={0.573} style={{ pointerEvents: 'none' }}>
          <img src={equation_5} style={{ width: '20%', marginLeft: '10%', transform: 'rotate(-5deg)' }} />
        </ParallaxLayer>
        
        <ParallaxLayer offset={0.2} speed={0.25} style={{ pointerEvents: 'none' }}>
          <img src={graphbar} style={{ width: '10%', marginLeft: '80%', transform: 'rotate(-5deg)' }} />
        </ParallaxLayer>
        <ParallaxLayer offset={1.3} speed={-0.1} style={{ pointerEvents: 'none' }}>
          <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <img src={url('earth')} style={{ width: '60%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundImage: url('clients', true)
          }}
        />
        */}

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.scrollTo(1)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div className="wrapper" style={{ marginLeft: "30%", transform: 'translate(-25%, 0)' }}>
            <img src={lattex} style={{ width: '50%', marginLeft: "50%", transform: 'translate(-50%, 0)' }} className="logo" />
            <Typography variant="h3" className="text" >AN ONLINE LATEX DOCUMENT PROCESSOR</Typography>
          </div>
        </ParallaxLayer>
        {/*
        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.scrollTo(2)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={url('bash')} style={{ width: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => parallax.scrollTo(0)}>
          <img src={url('clients-main')} style={{ width: '40%' }} />
        </ParallaxLayer>
        */}
      </Parallax>
    </>
  )
}
export default App