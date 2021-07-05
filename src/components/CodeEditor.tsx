import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import codeShift from 'jscodeshift'
import HighLighter from 'monaco-jsx-highlighter'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import { useRef } from 'react';

import './CodeEditor.css'
import './syntax.css'

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

        const highlighter = new HighLighter(
            // @ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        )
        highlighter.highLightOnDidChangeModelContent(
            () => { },
            () => { },
            undefined,
            () => { },
        )
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
            singleQuote: true,
        }).replace(/\n$/, '')
        // set formatted code back in the editor
        editorRef.current.setValue(formatted)
    }

    return (
        <div className="editor-wrapper">
            <button className="button button-format is-primary is-small"
                onClick={onFormatClick}>Format</button>
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