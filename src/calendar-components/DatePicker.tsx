import { useDateContext } from '@/context/DateContext'
import { MONTHS_FULL_NAME } from '@/helpers/constansts'
import React from 'react'

const DatePicker = () => {
const {state} = useDateContext()

    function dateFormat(date : Date) : string {
        return `${MONTHS_FULL_NAME[date.getMonth()]}`
    }
  return (
    <div>DatePicker</div>
  )
}

export default DatePicker