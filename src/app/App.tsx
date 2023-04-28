import React, { useEffect, useState } from 'react'

import '../App.scss'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

import { AppRouter } from './providers/router/AppRouter'

function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  )
}

export default App
