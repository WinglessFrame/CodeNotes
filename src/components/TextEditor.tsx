import React, { useEffect, useRef, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import './TextEditor.css'

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState<boolean>(false)
  const [value, setValue] = useState<string>('# Header')
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return
      }
      setEditing(false)
    }
    document.addEventListener('click', listener, { capture: true })

    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  if (editing) {
    return (
      <div ref={ref} className='text-editor'>
        <MDEditor value={value} onChange={(v) => setValue(v || '')} />
      </div>
    )
  }

  return (
    <div onClick={() => setEditing(true)} className='text-editor'>
      <MDEditor.Markdown source={value} />
    </div>
  )
}

export default TextEditor
