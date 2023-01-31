import { RoomClient } from "../../types";
import { Image } from "./Image";

import guestImg from '../../assets/guest.png';

interface Props {
    client: RoomClient;
}

export const Client = ({ client }: Props) => {
    const { host, socketId, username, avatar } = client;
    return (
        <li className="room__clients-item">
            <Image alt={`${username}'s avatar`} src={avatar ? avatar : guestImg} isStatic={avatar ? false : true} isStranger={avatar ? true : false} className="room__clients-img" />
            <h3 className="room__clients-username">{username}</h3>
        </li>
    );
};