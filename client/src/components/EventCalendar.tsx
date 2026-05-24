import { Calendar } from 'antd'
import React, { FC } from 'react'
import { EventState } from '../store/slices/eventSlice'

interface EventCalendarProps {
	events: EventState[]
}

const EventCalendar: FC<EventCalendarProps> = () => {
	return <Calendar></Calendar>
}

export default EventCalendar
