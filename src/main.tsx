import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import NavigationBar from './NavigationBar/nav'
import EditorBody from './Editor/editor-body'
import RevisionButtons from './RevisionControl/revision-buttons'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavigationBar />
    <div className='body'>
      <EditorBody />
      <RevisionButtons />
    </div>
  </React.StrictMode>,
)
