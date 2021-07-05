import { useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler'
import Resizable from './Resizable';

const CodeCell = () => {
  const [input, setInput] = useState<string>('');
  const [code, setCode] = useState<string>('')

  const onClick = async () => {
    const output = await bundle(input)
    setCode(output)
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="document.querySelector('#root').innerHTML = '<h1>Hi!</h1>'"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell