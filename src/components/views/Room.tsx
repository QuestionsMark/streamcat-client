import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useSocket } from "../../contexts/socket.context";
import { useUser } from "../../contexts/user.context";
import { useCreateListener } from "../../hooks/useSocketListener";
import { Button } from "../common/Button";
import { Paragraph } from "../common/Paragraph";
import { Section } from "../common/Section";
import { Input } from "../form-elements/Input";
import { Player } from "../common/Player";
import { ContentWrapper } from "../layout/ContentWrapper";
import { Main } from "../layout/Main";
import { Form } from "../form-elements/Form";
import { LinkSchema } from "../../utils/validation.util";
import { ClientResponseOK, RoomClient, RoomDataPayload, RoomExitedPayload, RoomJoinedPayload, RoomJoinPayload, RoomSynchronizedPayload, RoomVideoNewPayload } from "../../types";

export const Room = () => {
    const { socket, socketId } = useSocket();
    const { username, avatar } = useUser();

    const { id } = useParams();

    const [link, setLink] = useState('');
    const [src, setSrc] = useState('');
    const [clients, setClients] = useState<RoomClient[]>([]);

    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const onSuccess = (response: ClientResponseOK<string>) => {
        console.log(response.results);
    };

    useEffect(() => {
        if (!socket) return;
        socket.emit('room-join', { socketId, username: username || socketId, roomId: id, avatar } as RoomJoinPayload);
        return () => {
            socket.emit('room-exit', { username: username || socketId, roomId: id });
        }
    }, []);

    // for self listeners
    useCreateListener('room-data', ({ src, clients }: RoomDataPayload) => {
        setSrc(src);
        setClients(clients);
    });


    // for all roommates listeners
    useCreateListener('room-joined', ({ username }: RoomJoinedPayload) => {
        console.log(`${username} dołączył do pokoju!`);
    });
    useCreateListener('room-exited', ({ username }: RoomExitedPayload) => {
        console.log(`${username} opuścił pokoj!`);
    });
    useCreateListener('room-video-new', ({ src }: RoomVideoNewPayload) => {
        console.log(src);
        setSrc(src);
    });
    useCreateListener('room-synchronized', ({ time }: RoomSynchronizedPayload) => {
        console.log({ time });
    });

    return (
        <ContentWrapper>
            <Main className="room">
                <Section title="Share link" className="room__share-link">
                    <Paragraph indent={false} className="room__share-link-text">
                        Share this link to invite your friends to watch together: <span>{window.location.href}</span>
                    </Paragraph>
                    <Button onClick={handleClick} className="btn--icon" type="button">
                        <MdContentCopy className="room__copy-icon" />
                    </Button>
                </Section>
                <Section>
                    <Form
                        form={link}
                        options={{
                            path: `room/${id}/find-video`,
                            body: {link},
                            method: 'POST',
                        }}
                        validationSchema={LinkSchema}
                        className="room__video-form"
                        onSuccess={onSuccess}
                    >
                        <Input className="room__inp" value={link} onChange={e => setLink(e.target.value)} placeholder="Paste YouTube link here" />
                        <Button className="btn--icon">
                            <BiSearchAlt className="room__video-form-icon" />
                        </Button>
                    </Form>
                    <Player className="room__video" src={src} />
                </Section>
                <Section title="Online Clients">
                    {clients.map(c => username)}
                </Section>
            </Main>
        </ContentWrapper>
    );
};