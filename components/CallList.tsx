'use client'
import { useGetCalls } from '@/Hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';


const CallList = ({type}:{type: 'ended' | 'Upcoming' | 'recordings'}) => {
  const router = useRouter();
  const {endedCalls , upcomingCalls, callRecordings, isLoading} = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  

    const getCalls = () => {
      switch (type) {
        case 'ended':
          return endedCalls;
        case 'recordings':
          return callRecordings;
        case 'Upcoming':
          return upcomingCalls;
        default:
          return [];
      }
    };
  
    const getNoCallsMessage = () => {
      switch (type) {
        case 'ended':
          return 'No Previous Calls';
        case 'Upcoming':
          return 'No Upcoming Calls';
        case 'recordings':
          return 'No Recordings';
        default:
          return '';
      }
    };
    
    useEffect(() => {
      const fetchRecordings = async () => {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
        );
  
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
  
        setRecordings(recordings);
      };
  
      if (type === 'recordings') {
        fetchRecordings();
      }
    }, [type, callRecordings]);


    if (isLoading) return <Loader />;
  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className='grid grid-col-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? ( calls.map( (meeting: Call| CallRecording) => (
        <MeetingCard 
          key={(meeting as Call).id}
          icon={
            type === 'ended'
              ? '/icons/previous.svg'
              : type === 'Upcoming'
                ? '/icons/upcoming.svg'
                : '/icons/recordings.svg'
          }
          title={
            (meeting as Call).state?.custom?.description ||
            (meeting as CallRecording).filename?.substring(0, 20) ||
            'No Description'
          }
          date={
            (meeting as Call).state?.startsAt?.toLocaleString() ||
            (meeting as CallRecording).start_time?.toLocaleString()
          }
          isPreviousMeeting={type === 'ended'}
          buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
          handleClick={
            type === 'recordings'
              ? () => router.push(`${(meeting as CallRecording).url}`)
              : () => router.push(`/meeting/${(meeting as Call).id}`)
          }
          buttonText={type === 'recordings' ? 'Play' : 'Start'}
          link={
            type === 'recordings'
              ? (meeting as CallRecording).url
              : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
          }
        />
      ))
    ) :(
      <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
    )
    }
    </div>
  );
}

export default CallList