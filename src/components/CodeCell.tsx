import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler'
import Resizable from './Resizable';

const CodeCell = () => {
  const initialValue = "document.querySelector('#root').innerHTML = '<h1>Hi!</h1>'"

  const [input, setInput] = useState<string>(initialValue);
  const [err, setErr] = useState<string>('')
  const [code, setCode] = useState<string>('')

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input)
      setCode(output.code)
      setErr(output.err)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={initialValue}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell