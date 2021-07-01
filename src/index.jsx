import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'
import ApiContextProvider from './utils/ApiContextProvider'

const GlobalStyle = createGlobalStyle`
*, *::after, *::before {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

p{
  line-height: 40px;
}

#root {
  position: relative;
}

canvas {
  width: 100vw;
  z-index: 3;
  height: 100vh;
  background-color: #8dd1e9;
}
`

ReactDOM.render(
  <>
    {/* Passing the WordPress data to the App */}
    <ApiContextProvider>
      <GlobalStyle />
      <App />
    </ApiContextProvider>
  </>,

  document.getElementById('root')
)
