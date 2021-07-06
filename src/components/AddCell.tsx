import React from 'react'
import { useActions } from '../hooks/useActions'
import './AddCell.css'


interface AddCellProps {
  nextCellId: string | null
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions()

  return (
    <div className='add-cell' style={{ opacity: nextCellId ? 0 : 1 }}>
      <button className='button is-rounded is-primary is-small' onClick={() => insertCellBefore(nextCellId, 'code')}>
        <span className='icon is-small'>
          <i className='fas fa-plus'></i>
        </span>
        <span>Code</span>
      </button>
      <button className='button is-rounded is-primary is-small' onClick={() => insertCellBefore(nextCellId, 'text')}>
        <span className='icon is-small'>
          <i className='fas fa-plus'></i>
        </span>
        <span>Text</span>
      </button>
      <div className='devider'></div>
    </div>
  )
}

export default AddCell
