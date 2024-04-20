
import StreamVideoProvider from '@/Providers/StreamClientProviders'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "ZOOM",
  description: "Video calling App created by Shresth",
  icons:{
    icon: '/icons/logo.svg',
  }
};

const Rootlayout = ({children}: {children: ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
        
    </main>
  )
}

export default Rootlayout