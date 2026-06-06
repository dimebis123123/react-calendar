import React, { FC, useState } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd'
import { login } from '../http/api'
import { setEmail, setAuth, setError } from '../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useSelector } from 'react-redux'
const EventForm = () => {
	type FieldType = {
		description?: string
	}
	const guests = useAppSelector(state => state.event.guests)
	const options = guests.map(option => ({
		value: option.email,
		label: option.email,
	}))

	return (
		<Form>
			<Form.Item<FieldType>
				label='Описание экспедиции'
				name='description'
				rules={[
					{ required: true, message: 'Пожалуйста введи описание путник!' },
				]}
			>
				<Input />
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
				<DatePicker />
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
					style={{ width: 120 }}
					options={options}
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
