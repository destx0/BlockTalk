import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

// Assets
import person from "../assets/person.svg";
import person2 from "../assets/person2.png";
import person3 from "../assets/tblock.png";
import send from "../assets/send.svg";

// Socket
const socket = io("ws://localhost:3030");

const Messages = ({ account, messages, currentChannel }) => {
	const [message, setMessage] = useState("");

	const messageEndRef = useRef(null);

	const sendMessage = async (e) => {
		e.preventDefault();

		const messageObj = {
			channel: currentChannel.id.toString(),
			account: account,
			text: message,
		};

		if (message !== "") {
			socket.emit("new message", messageObj);
		}

		setMessage("");
	};

	const scrollHandler = () => {
		setTimeout(() => {
			messageEndRef.current.scrollIntoView({ behavior: "smooth" });
		}, 500);
	};

	useEffect(() => {
		scrollHandler();
	});

	return (
		<div className="text">
			<div className="messages">
				{currentChannel &&
					messages
						.filter(
							(message) => message.channel === currentChannel.id.toString()
						)
						.map((message, index) => (
							<div className=" message" key={index}>
								<img
									// src={
									// 	message.account ===
									// 	"0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
									// 		? person2
									// 		: person3
									// }
									src={person3}
									alt="Person"
								/>
								<div className="message_content">
									<h3>
										{message.account.slice(0, 6) +
											"..." +
											message.account.slice(38, 42)}
									</h3>
									<p>{message.text}</p>
								</div>
							</div>
						))}

				<div ref={messageEndRef} />
			</div>

			<form onSubmit={sendMessage}>
				{currentChannel && account ? (
					<input
						type="text"
						value={message}
						placeholder={`Message #${currentChannel.name}`}
						onChange={(e) => setMessage(e.target.value)}
					/>
				) : (
					<input
						type="text"
						value=""
						placeholder={`Please Connect Wallet / Join the Channel`}
						disabled
					/>
				)}

				<button type="submit">
					<img src={send} alt="Send Message" />
				</button>
			</form>
		</div>
	);
};

export default Messages;
