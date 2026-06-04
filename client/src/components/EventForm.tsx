import React, { FC, useState } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd'
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
			<Form.Item
				label='Выберите участников'
				name='date'
				rules={[
					{
						required: true,
						message: 'Пожалуйста введи дату экспедиции, это важно!',
					},
				]}
			>
				<Select
					defaultValue='lucy'
					style={{ width: 120 }}
					options={[
						{ value: 'jack', label: 'Jack' },
						{ value: 'lucy', label: 'Lucy' },
						{ value: 'Yiminghe', label: 'yiminghe' },
						{ value: 'disabled', label: 'Disabled', disabled: true },
					]}
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
