import React, { useEffect, useRef, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import './TextEditor.css'
import { Cell } from '../store/cell'
import { useActions } from '../hooks/useActions'

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const { updateCell } = useActions()

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
        <MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || '')} />
      </div>
    )
  }

  return (

    <div onClick={() => setEditing(true)} className='text-editor card'>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  )
}

export default TextEditor
