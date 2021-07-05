import { useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler'

const CodeCell = () => {
  const [input, setInput] = useState<string>('');
  const [code, setCode] = useState<string>('')

  const onClick = async () => {
    const output = await bundle(input)
    setCode(output)
  };

  return (
    <div>
      <CodeEditor
        initialValue="document.querySelector('#root').innerHTML = '<h1>Hi!</h1>'"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell