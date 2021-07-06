import React from 'react'
import { useActions } from '../hooks/useActions'
import ActionButton from './ActionButton'
import './ActionBar.css'

interface ActionBarProps {
  id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions()

  return (
    <div className='action-bar'>
      <ActionButton action={() => moveCell(id, 'up')} icon='fas fa-arrow-up' />
      <ActionButton action={() => moveCell(id, 'down')} icon='fas fa-arrow-down' />
      <ActionButton action={() => deleteCell(id)} icon='far fa-trash-alt' />
    </div>
  )
}

export default ActionBar
