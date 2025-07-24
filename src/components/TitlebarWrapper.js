// app/components/TitlebarWrapper.js
'use client'

import { useEffect, useState } from 'react'
import Titlebar from './Titlebar'

export default function TitlebarWrapper() {
  const [isElectron, setIsElectron] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      setIsElectron(true)
    }
  }, []);

  return isElectron ? <Titlebar /> : null
}
