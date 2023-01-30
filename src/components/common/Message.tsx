import { Message as MessageInterface } from "../../types";

interface Props {
    message: MessageInterface;
}

export const Message = ({ message }: Props) => {
    const { date, message: text, username } = message;
    return (
        <li className="room__chat-item">
            <time className="room__chat-date">{date}</time>
            <h3 className="room__chat-username">{username}:</h3>
            <p className="room__chat-text">{text}</p>
        </li>
    );
};