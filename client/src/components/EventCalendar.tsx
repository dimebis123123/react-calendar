import { Calendar } from 'antd'
import React, { FC } from 'react'
import { EventState } from '../store/slices/eventSlice'
import { useAppSelector } from '../hooks'
import { Dayjs } from 'dayjs'

interface EventCalendarProps {
	events: any[]
}

const EventCalendar: FC<EventCalendarProps> = props => {
	const events = useAppSelector(state => state.event.events)

	const dateCellRender = (value: Dayjs) => {
		const formattedDate = value.format('YYYY-MM-DD')
		const currentDayEvents = events.filter(ev => ev.date === formattedDate)

		return (
			<div>
				{currentDayEvents.map((ev, index) => (
					<div key={index}>
						{ev.title} <br />
						{ev.description}
					</div>
				))}
			</div>
		)
	}
	return <Calendar cellRender={dateCellRender}></Calendar>
}

export default EventCalendar
