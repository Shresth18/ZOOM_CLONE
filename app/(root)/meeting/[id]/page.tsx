'use client'
import { useGetCallbyId } from '@/Hooks/useGetCallbyId';
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'


const meeting = ({params}: {params: {id: string}}) => { 


  const {id} = useParams(); 
  const {user ,isLoaded} = useUser();
  const [isSetupComplete, setIsSetUpComplete] = useState(false);
  const { call , isCallLoading } = useGetCallbyId(id);
  if(!isLoaded || isCallLoading) return <Loader />

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetUpComplete={setIsSetUpComplete} />
          ): (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>

    </main>
  )
}

export default meeting