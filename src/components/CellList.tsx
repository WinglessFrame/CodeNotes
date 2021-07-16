import React, { Fragment, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import AddCell from './AddCell'
import CellListItem from './CellListItem'
import './CellList.css'
import useAuth from '../hooks/useAuth'
import { useActions } from '../hooks/useActions'

const CellList: React.FC = () => {
  const { user } = useAuth()
  const { fetchNotes, insertCellAfter } = useActions()

  useEffect(() => {
    if (user) {
      fetchNotes(user.uid)
    } else {
      insertCellAfter(null, 'code')
      insertCellAfter(null, 'text')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id])
  })

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      {user && (<AddCell previousCellId={cell.id} />)}
    </Fragment>
  ))

  return (
    <div className='cell-list'>
      {user && (<AddCell previousCellId={null} />)}
      {renderedCells}
    </div>
  )
}

export default CellList
