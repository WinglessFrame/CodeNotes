import React from 'react'
import { useActions } from '../hooks/useActions'
import './AddCell.css'


interface AddCellProps {
  previousCellId: string | null
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId: nextCellId }) => {
  const { insertCellAfter } = useActions()

  const lastOneStyle = nextCellId ? {} : { opacity: 1 }

  return (
    <div className='add-cell' style={lastOneStyle}>
      <button
        className='button is-rounded is-primary is-small'
        onClick={() => insertCellAfter(nextCellId, 'code')}
      >
        <span className='icon is-small'>
          <i className='fas fa-plus'></i>
        </span>
        <span>Code</span>
      </button>
      <button
        className='button is-rounded is-primary is-small'
        onClick={() => insertCellAfter(nextCellId, 'text')}
      >
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
