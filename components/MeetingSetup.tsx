'use client'
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = ({setIsSetUpComplete}:{ setIsSetUpComplete: (value: boolean) => void}) => {

  const [isMicCamToggledOn ,setisMicCamToggledOn] = useState(false)
  const call = useCall();

  if(!call) throw new Error('usecall must be used withim stream call componenet')
  useEffect( () =>{
    if(isMicCamToggledOn){
      call?.camera.disable();
      call?.microphone.disable();
    }else{
      call?.camera.enable();
      call?.microphone.enable();
    }

  },[isMicCamToggledOn,call?.camera,call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className='tex-2xl font-bold'>Setup</h1>
      <VideoPreview />
      <div className='flex h-16 items-center justify-center gap-3'>
      <label className='flex h-16 items-center justify-center gap-2 font-medium'>
      <input
        type="checkbox"
        checked={isMicCamToggledOn}
        onChange = { (e) => setisMicCamToggledOn(e.target.checked)}
      />
      Join with mic and Camera off
      </label>
      <DeviceSettings />
      </div>
      <button className='rounded-md bg-green-500 px-4 py-2.5' 
        
        onClick={() =>{
          call.join();

          setIsSetUpComplete(true);
        }}
        >
        Join Meeting
      </button>
    </div>
  )
}

export default MeetingSetup