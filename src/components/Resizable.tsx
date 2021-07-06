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
  const [width, setWidth] = useState(window.innerWidth * 0.75)

  useEffect(() => {
    let timer: any
    const listener = () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setInnerWindth(window.innerWidth)
        setInnerHeight(window.innerHeight)
        if (window.innerWidth * .75 < width) {
          setWidth(window.innerWidth * .75)
        }
      }, 100)
    }
    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [width])

  if (direction === 'horizontal') {
    resizableProps = {
      minConstraints: [innerHeight * .2, Infinity],
      maxConstraints: [innerWidth * .75, Infinity],
      className: "resize-horizontal",
      width,
      height: Infinity,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
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
