import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import EventForm from './EventForm'

// Modal.tsx
interface ModalProps {
	isOpen: boolean
	onClose: () => void
	// или можно передать setState напрямую
	// onClose: Dispatch<SetStateAction<boolean>>;
}

const ModalWindow = ({ isOpen, onClose }: ModalProps) => {
	return (
		<>
			<Modal
				title='Добавить экспедицию'
				closable={{ 'aria-label': 'Custom Close Button' }}
				open={isOpen}
				onCancel={onClose}
				footer={null}
			>
				<EventForm onCancel={onClose}></EventForm>
			</Modal>
		</>
	)
}

export default ModalWindow
