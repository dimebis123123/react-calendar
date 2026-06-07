import React, { FC, useState } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd'
import { login } from '../http/api'
import { setEmail, setAuth, setError } from '../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useSelector } from 'react-redux'
import { EventState } from '../store/slices/eventSlice'
import { Moment } from 'moment'
import { Dayjs } from 'dayjs'
const EventForm = () => {
	type FieldType = {
		description?: string
		title?: string
	}
	const guests = useAppSelector(state => state.event.guests)
	const options = guests.map(option => ({
		value: option.email,
		label: option.email,
	}))

	const [event, setEvent] = useState<EventState>({
		author: '',
		guests: [],
		date: '',
		description: '',
		title: '',
	})
	function selectChange(guests: string[]) {
		setEvent({ ...event, guests: guests })
	}

	return (
		<Form>
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
				<Button
					type='primary'
					htmlType='submit'
					onClick={() => console.log(event)}
				>
					Создать
				</Button>
			</Form.Item>
		</Form>
	)
}

export default EventForm
