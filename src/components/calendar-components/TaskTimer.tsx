import React, { useState, useEffect, useRef } from 'react';
import Play from '../icons/Play';
import Stop from '../icons/Stop';
import ProjectSelector from '../projects/ProjectSelector';
import { useProjectsContext } from '@/context/ProjectContext';
import TimerTaskCreateModal from './TimerTaskCreateModal';

function TaskTimer() : JSX.Element {
  const {projectsState} = useProjectsContext()
  const [title, setTitle] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [projectId, setProjectId] = useState<string>('')
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)

  useEffect(() => {
    const savedTitle = localStorage.getItem('task-title');
    const savedStartTime = localStorage.getItem('task-start-time');
    const savedIsRunning = localStorage.getItem('task-is-running') === 'true';

    if (savedTitle) setTitle(savedTitle);
    if (savedStartTime) setStartTime(new Date(savedStartTime));
    setIsRunning(savedIsRunning);
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem('task-title', title);
    localStorage.setItem('task-start-time', startTime ? startTime.toISOString() : '');
    localStorage.setItem('task-is-running', isRunning.toString());
  }, [title, startTime, isRunning]);

  const handleStart = () => {
    setStartTime(new Date());
    setCurrentTime(new Date());
    setIsRunning(true);
  };

  const handleDone = () => {
    setIsRunning(false);
    if(calculateMinutesPassed(currentTime!) - calculateMinutesPassed(startTime!) >= 15 || true){
      setShowCreateTaskModal(true)
    } else {
      setTitle('');
      setStartTime(null);
      setCurrentTime(null);
    }
    localStorage.removeItem('task-title');
    localStorage.removeItem('task-start-time');
    localStorage.removeItem('task-is-running');
  };

  const formatTime = (start: Date | null, current: Date | null): string => {
    if (!start || !current) return '00:00:00';
    const elapsed = Math.floor((current.getTime() - start.getTime()) / 1000);
    const hrs = Math.floor(elapsed / 3600).toString().padStart(2, '0');
    const mins = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
    const secs = (elapsed % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const calculateMinutesPassed = (date: Date): number => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (hours * 60) + minutes;
  };

  return (
    <div
      className='w-full flex items-center justify-between px-6 py-4 rounded-md shadow-sm outline outline-1 outline-zinc-200'    
    >
      <input
        type="text"
        value={title}
        disabled = {isRunning}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className='focus:outline-none text-xl w-[50%] disabled:bg-transparent'
      />
      <div className='flex items-center gap-8 z-[9999]'>
        <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
        <p className='text-lg'>
          {formatTime(startTime , currentTime)}
        </p>
        {!isRunning ? (
          <button 
            className='rounded-md bg-bl p-1 flex items-center justify-center disabled:cursor-not-allowed'
            disabled = {!title}
            onClick={handleStart}
          >
            <Play 
              stroke='black'
              fill='black'
              className={`size-7 transition-all duration-100 ${title &&'hover:fill-blue-700 hover:stroke-blue-700'}`}
            />
          </button>
        ) : (
          <button 
            className='rounded-full p-1 flex items-center justify-center transition-all duration-100 disabled:cursor-not-allowed'
            onClick={handleDone}
          >
            <Stop 
              stroke='black'
              fill='black'
              className='size-7 hover:fill-red-500 hover:stroke-red-500 transition-all duration-100' 
            />
          </button>
        )}
      </div>
      {
        showCreateTaskModal && startTime && currentTime &&(
        <TimerTaskCreateModal
          title={title}
          projectId={projectId}
          date={startTime}
          startTime={calculateMinutesPassed(startTime)}
          endTime={calculateMinutesPassed(currentTime)}
          setShow={setShowCreateTaskModal}
          doneCleanUp={() => {
            setTitle('');
            setStartTime(null);
            setCurrentTime(null);
          }}    
        />)
      }
    </div>
  );
};

export default TaskTimer;
