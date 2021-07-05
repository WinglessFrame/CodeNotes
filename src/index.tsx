import { useState } from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from './components/CodeEditor';
import bundle from './bundler'
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import Preview from './components/Preview';

const App = () => {
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

ReactDOM.render(<App />, document.querySelector('#root'));
