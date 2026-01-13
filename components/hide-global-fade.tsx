'use client'

import { useEffect } from 'react'

export function HideGlobalFade() {
  useEffect(() => {
    const fadeEl = document.getElementById('global-fade')
    if (fadeEl) {
      fadeEl.style.display = 'none'
    }
    return () => {
      if (fadeEl) {
        fadeEl.style.display = ''
      }
    }
  }, [])

  return null
}
