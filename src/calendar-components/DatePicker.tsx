import { useDateContext } from '@/context/DateContext'
import { monthDayYearFormatDate } from '@/helpers/timefunctions'
import React, { useEffect, useRef, useState } from 'react'
import Calendar from './Calendar'


const DatePicker = () => {
  const {state} = useDateContext()
  const [showCalendar , setShowCalendar] = useState(false)
    
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event : MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div ref = {calendarRef}>
      <div 
        className='outline w-64 outline-1 outline-zinc-200 py-1 px-4 rounded-md shadow-sm relative cursor-pointer flex items-center gap-2'
        onClick={() => setShowCalendar(prev => !prev)}
      >
        
        <img className='w-5 h-5' src='/assets/icons/calendar.svg' />
        <p>{monthDayYearFormatDate(state.displayDate)}</p>
      </div>
      <div className='absolute bg-white z-[50000000] top-[40px]'>{
        showCalendar && <Calendar setShowCalendar={setShowCalendar}/>
      }</div>
    </div>
  )
}

export default DatePicker