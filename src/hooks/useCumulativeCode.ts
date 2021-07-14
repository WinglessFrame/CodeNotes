import { useTypedSelector } from './useTypedSelector';

export const useCumulativeCode = (cellId: string) => {
  useTypedSelector((state) => state.bundles[cellId]);

  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
      import _React from 'react'
      import _ReactDOM from 'react-dom'
      var show = (value) => {
        const root = document.getElementById('root')
        if (typeof value === 'object'){
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root)
          }else {
            root.innerHTML = JSON.stringify(value)
          }
        } else
        root.innerHTML = value || ''
      }
    `;
    const showFuncNoOp = `var show = () => {}`;

    const codeCells = [showFuncNoOp];

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          codeCells.push(showFunc);
        }
        codeCells.push(c.content);
        if (c.id === cellId) {
          break;
        }
      }
    }
    return codeCells.join('\n');
  });
};
