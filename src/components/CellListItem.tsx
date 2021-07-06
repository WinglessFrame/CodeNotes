import React from 'react'
import { Cell } from '../store/cell'
import ActionBar from './ActionBar'
import CodeCell from './CodeCell'
import TextEditor from './TextEditor'
import './CellListItem.css'

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = <CodeCell cell={cell} />
  } else {
    child = <TextEditor cell={cell} />
  }

  return (
    <div className='cell-list-item'>
      <ActionBar id={cell.id} />
      {child}
    </div>
  )
}

export default CellListItem
