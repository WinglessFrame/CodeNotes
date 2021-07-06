import React, { useEffect, useRef } from 'react'

import './Preview.css'

interface PreviewProps {
  code: string
  err: string
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (error) => {
        document.querySelector('#root').innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + error + '</div>'
        console.error(error)
      }

      window.addEventListener('error', (event) => {
        event.preventDefault()
        handleError(event.error)
      })

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (error) {
          handleError(error)
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code])

  return (
    <div className={'preview-wrapper'}>
      <iframe
        style={{ background: '#fff', width: "100%", height: "100%" }}
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        title="preview"
      />
      {err && <div className='preview-error'>{err}</div>}
    </div>
  )
}

export default Preview
