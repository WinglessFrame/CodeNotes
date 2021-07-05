import React, { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'
import './Resizable.css'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps

  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [innerWidth, setInnerWindth] = useState(window.innerWidth)

  useEffect(() => {
    const listener = () => {
      setInnerWindth(window.innerWidth)
      setInnerHeight(window.innerHeight)
    }
    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [])

  if (direction === 'horizontal') {
    resizableProps = {
      minConstraints: [innerHeight * .2, Infinity],
      maxConstraints: [innerWidth * .75, Infinity],
      className: "resize-horizontal",
      width: window.innerWidth * 0.75,
      height: Infinity,
      resizeHandles: ['e'],
    }
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * .9],
      minConstraints: [Infinity, innerWidth * .1]
    }
  }

  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  )
}


export default Resizable
