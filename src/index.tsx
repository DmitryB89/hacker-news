import React from 'react'

import ReactDOM from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './app/App'
import { ErrorBoundary } from './app/providers/error/ErrorProvider'
import { store } from './app/providers/store/store'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </BrowserRouter>
)

reportWebVitals()
