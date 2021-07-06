import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import AddCell from './AddCell'
import CellListItem from './CellListItem'

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id])
  })

  const renderedCells = cells.map(cell => (
    <>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} key={cell.id} />
    </>
  ))

  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} />
    </div>
  )
}

export default CellList
