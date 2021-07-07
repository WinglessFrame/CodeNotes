import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell } from '../store/cell';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector'

import './CodeCell.css'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector((state) => state.bundles[cell.id])

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content)
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle])

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {
          !bundle || bundle.loading
            ?
            <div className='progress-wrapper'>
              <div className='progress-cover'>
                <progress className='progress is-small is-primary' max='100'>
                  Loading
                </progress>
              </div>
            </div>
            : <Preview code={bundle.code} err={bundle.err} />
        }
      </div>
    </Resizable>
  );
};

export default CodeCell