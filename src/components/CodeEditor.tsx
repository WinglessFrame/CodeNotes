import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import { useRef } from 'react';

interface CodeEditorProps {
    initialValue: string
    onChange: (value: string) => void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>()

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        })

        monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
    }

    const onFormatClick = () => {
        // get cur value
        const unformatted = editorRef.current.getModel().getValue()
        // format
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        })
        // set formatted code back in the editor
        editorRef.current.setValue(formatted)

    }

    return (
        <div>
            <button onClick={onFormatClick}>Format</button>
            <MonacoEditor
                height="500px"
                language="javascript"
                theme="dark"
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
                value={initialValue}
                editorDidMount={onEditorDidMount}
            />
        </div>
    )
}

export default CodeEditor