import React, { Fragment, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import AddCell from './AddCell'
import CellListItem from './CellListItem'
import './CellList.css'
import * as db from '../firestore'
import useAuth from '../hooks/useAuth'
import { useActions } from '../hooks/useActions'

const CellList: React.FC = () => {
  const { user, loading } = useAuth()
  const { fetchNotes } = useActions()

  useEffect(() => {
    if (user) {
      fetchNotes(user.uid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id])
  })

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ))

  return (
    <div className='cell-list'>
      <AddCell previousCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
