import React, { useState } from 'react'
import { Button, Modal } from 'antd'

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
				title='Basic Modal'
				closable={{ 'aria-label': 'Custom Close Button' }}
				open={isOpen}
				onCancel={onClose}
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</>
	)
}

export default ModalWindow
