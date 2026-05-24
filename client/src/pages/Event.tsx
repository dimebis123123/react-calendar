import { Button, Layout, Row } from 'antd'
import React, { FC, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import ModalWindow from '../components/ModalWindow'

const Event: FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	return (
		<Layout>
			<EventCalendar events={[]}></EventCalendar>
			<Row justify='center'>
				<Button
					onClick={() => {
						setIsModalOpen(true)
					}}
				>
					Добавить Событие
				</Button>
			</Row>
			<ModalWindow
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			></ModalWindow>
		</Layout>
	)
}

export default Event
