import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'


type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const [layout, setlayout] = useState<CallLayoutType>('speaker-left')
  const [showPartcipants,setShowPartcipants] = useState(false);
  const router = useRouter();
  const CallLayout = () => {  
      switch (layout) {
        case 'grid':
          return <PaginatedGridLayout/>
        case 'speaker-right':
          return <SpeakerLayout participantsBarPosition='left' />
        default:
          return <SpeakerLayout participantsBarPosition='right' />
      }

  }

  return (
    <section className='realtive h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full ,max-w-[1000px]  items-center'>
        <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showPartcipants})}>
          <CallParticipantsList onClose={() =>{
            setShowPartcipants(false)
          }} />
        </div>
      </div>
      
      <div className='fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-5'>
          <CallControls onLeave={() => router.push(`/`)} />

          <DropdownMenu>
            <div className='flex items-center'>
              <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                <LayoutList  size={20} className='text-white'/>
              </DropdownMenuTrigger>
            </div>
              
              <DropdownMenuContent className='bg-dark-1 text-white border-dark-1'>
                 {['grid','speaker-left','speaker-right'].map((item,index)=>(
                    <div key={index}>
                      <DropdownMenuItem className='cursor-pointer'
                      onClick = {()=>{
                        setlayout(item.toLowerCase() as CallLayoutType)
                      }}>
                      {item}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className='border-dark-1' />
                    </div>
                 ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <CallStatsButton />

            <button onClick={ () => setShowPartcipants((prev) =>!prev) }>
                  <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                    <User size={20} className='text-white' />
                  </div>
            </button>
            {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}

export default MeetingRoom