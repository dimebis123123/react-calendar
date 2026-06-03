import React, { FC, useState } from 'react'
import { Button, Checkbox, DatePicker, Form, Input } from 'antd'
import { login } from '../http/api'
import { setEmail, setAuth, setError } from '../store/slices/userSlice'
import { useAppDispatch } from '../hooks'
const EventForm = () => {
	type FieldType = {
		description?: string
	}
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
			<Form.Item label={null}>
				<Button type='primary' htmlType='submit'>
					Создать
				</Button>
			</Form.Item>
		</Form>
	)
}

export default EventForm
