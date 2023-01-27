import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../contexts/socket.context";
import { useUser } from "../../contexts/user.context";
import { useCreateListener } from "../../hooks/useSocketListener";
import { ContentWrapper } from "../layout/ContentWrapper";
import { Main } from "../layout/Main";

export const Room = () => {
    const { socket, socketId } = useSocket();
    const { username } = useUser();

    const { id } = useParams();

    useEffect(() => {
        if (!socket) return;
        socket.emit('room-join', { socketId, username: username || socketId, roomId: id });
        return () => {
            socket.emit('room-exit', { username: username || socketId, roomId: id });
        }
    }, []);

    useCreateListener('room-joined', ({ username }: { username: string }) => {
        console.log(`${username} dołączył do pokoju!`);
    });
    useCreateListener('room-exited', ({ username }: { username: string }) => {
        console.log(`${username} opuścił pokoj!`);
    });

    return (
        <ContentWrapper>
            <Main className="room">
                
            </Main>
        </ContentWrapper>
    );
};