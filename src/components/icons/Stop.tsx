import React from 'react'

interface Props {
  className ?: string, 
  fill ?: string , 
  strokeWidth ?: number,
  stroke ?: string
}

const Stop = (props : Props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill={props.fill || "none"} 
      viewBox="0 0 24 24" 
      strokeWidth={props.strokeWidth || 1.5} 
      stroke={props.stroke || "currentColor"} 
      className={props.className ||'size-6'}
    >
  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
</svg>

  )
}

export default Stop