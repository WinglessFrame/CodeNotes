import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';

interface CodeEditorProps {
    initialValue: string
    onChange: (value: string) => void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        })
    }

    return <MonacoEditor
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
}

export default CodeEditor