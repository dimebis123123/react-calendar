import React, { FC, useState } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd'
import { createMyEvent, getEvents, login } from '../http/api'
import { setEmail, setAuth, setError } from '../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useSelector } from 'react-redux'
import { EventState, setEvents } from '../store/slices/eventSlice'
import { Moment } from 'moment'
import { Dayjs } from 'dayjs'

interface EventProps {
	onCancel: () => void
}

const EventForm: FC<EventProps> = ({ onCancel }) => {
	type FieldType = {
		description?: string
		title?: string
	}
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.user.email)
	const events = useAppSelector(state => state.event.events)
	const guests = useAppSelector(state => state.event.guests)
	const options = guests.map(option => ({
		value: option.email,
		label: option.email,
	}))

	const [event, setEvent] = useState<EventState>({
		author: user,
		guests: [],
		date: '',
		description: '',
		title: '',
		events: events,
	})

	const submitForm = async () => {
		const response = await createMyEvent(event)
		onCancel()
		getEvents().then(data => dispatch(setEvents(data)))
		alert(response)
	}
	function selectChange(guests: string[]) {
		setEvent({ ...event, guests: guests })
	}

	return (
		<Form onFinish={submitForm}>
			<Form.Item<FieldType>
				label='Название экспедиции'
				name='title'
				rules={[{ required: true, message: 'Название экспедиции необходимо' }]}
			>
				<Input
					value={event.title}
					onChange={e => setEvent({ ...event, title: e.target.value })}
				/>
			</Form.Item>
			<Form.Item<FieldType>
				label='Описание экспедиции'
				name='description'
				rules={[
					{ required: true, message: 'Пожалуйста введи описание путник!' },
				]}
			>
				<Input
					value={event.description}
					onChange={e => setEvent({ ...event, description: e.target.value })}
				/>
			</Form.Item>
			<Form.Item
				label='Дата экспедиции'
				name='date'
				rules={[
					{
						required: true,
						message: 'Пожалуйста введи дату экспедиции, это важно!',
					},
				]}
			>
				<DatePicker
					onChange={date =>
						setEvent({ ...event, date: date ? date.format('YYYY-MM-DD') : '' })
					}
				/>
			</Form.Item>
			<Form.Item
				label='Выберите участников'
				name='string'
				rules={[
					{
						required: true,
						message: 'Пожалуйста введи участников, это важно!',
					},
				]}
			>
				<Select
					defaultValue={options[0].value}
					style={{ width: 200 }}
					options={options}
					mode='multiple'
					onChange={selectChange}
				/>
			</Form.Item>
			<Form.Item label={null}>
				<Button type='primary' htmlType='submit'>
					Создать
				</Button>
			</Form.Item>
		</Form>
	)
}

export default EventForm
