import React, { Fragment } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import AddCell from './AddCell'
import CellListItem from './CellListItem'

const CellList: React.FC = () => {
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
    <div>
      <AddCell previousCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
