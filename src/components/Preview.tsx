import React, { useEffect, useRef } from 'react'

import './Preview.css'

interface PreviewProps {
  code: string

}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (error) {
          document.querySelector('#root').innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + error + '</div>'
          console.error(error);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
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
    </div>
  )
}

export default Preview
