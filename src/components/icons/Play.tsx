import React from 'react'

interface Props {
  className ?: string, 
  fill ?: string , 
  strokeWidth ?: number,
  stroke ?: string
}

const Play = (props : Props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill={props.fill || "none"} 
      viewBox="0 0 24 24" 
      strokeWidth={props.strokeWidth || 1.5} 
      stroke={props.stroke || "currentColor"} 
      className={props.className ||'size-6'}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>

  )
}

export default Play