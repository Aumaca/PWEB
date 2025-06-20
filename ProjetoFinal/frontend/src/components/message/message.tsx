import { FC, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"

import { MessageProps } from "../../interfaces/components/message"

import "./message.css"

const Message: FC<MessageProps> = ({
	isOpen,
	title,
	children,
	backgroundColor,
	closeMessage,
}) => {
	
	useEffect(() => {
		const timer = setTimeout(() => {
			closeMessage!()
		}, 5000)

		return () => clearTimeout(timer)
	}, [isOpen, closeMessage])

	return (
		<div
			className={`message ${isOpen ? "open" : ""}`}
			onClick={closeMessage}
		>
			<div
				className="message-container"
				style={{ backgroundColor: backgroundColor }}
			>
				<div className="message-content">
					<h4>{title}</h4>
					<p>{children}</p>
				</div>
				<div className="message-close">
					<FontAwesomeIcon
						icon={faClose}
						size="2x"
					/>
				</div>
			</div>
		</div>
	)
}

export default Message
