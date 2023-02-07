import { FormEvent, useEffect, useRef, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../contexts/socket.context";
import { useUser } from "../contexts/user.context";
import { useCreateListener } from "../hooks/useSocketListener";
import { Button } from "../components/common/Button";
import { Paragraph } from "../components/common/Paragraph";
import { Section } from "../components/common/Section";
import { Input } from "../components/form-elements/Input";
import { Player } from "../components/common/Player";
import { ContentWrapper } from "../components/layout/ContentWrapper";
import { Main } from "../components/layout/Main";
import { Form } from "../components/form-elements/Form";
import { checkValidation, LinkSchema, MessageSchema } from "../utils/validation.util";
import { ChatMessagePayload, ClientResponseOK, ClientSettingsChangePayload, RoomDataPayload, RoomExitedPayload, RoomJoinPayload, RoomVideoNewPayload } from "../types";
import { useRoom } from "../contexts/room.context";
import { List } from "../components/common/List";
import { Client } from "../components/common/Client";
import { Aside } from "../components/layout/Aside";
import { TbSend } from 'react-icons/tb';
import { Message } from "../components/common/Message";
import { toast } from "react-toastify";
import { fetchTool, minimalDelayFunction, showProblem } from "../utils/api.util";
import { usePromises } from "../contexts/promises.context";
import { LoadingScreen } from "../components/popups/LoadingScreen";

export const Room = () => {
    const { socket, socketId } = useSocket();
    const { username, avatar } = useUser();
    const { setError, setLoading } = usePromises();
    const { dispatch, state } = useRoom();

    const { id } = useParams();
    const navigate = useNavigate();

    const listRef = useRef<HTMLUListElement>(null);

    const [roomExisting, setRoomExisting] = useState(false);
    const [link, setLink] = useState('');
    const [message, setMessage] = useState('');
    const [src, setSrc] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        toast('Successfully copied!');
    };

    const onSuccess = (response: ClientResponseOK<string>) => {
        toast(response.results);
    };

    const handleMessageSend = async (e: FormEvent) => {
        e.preventDefault();
        const errors = checkValidation(message, MessageSchema);
        if (errors) return toast(showProblem({ message: 'Incorrect message: ', problems: errors }));
        if (!socket) return;
        socket.emit('chat-message-request', { message, username: username || socketId } as Omit<ChatMessagePayload, 'id'>);
        setMessage('');
    };

    const clientsList = () => {
        return state.clients.map(c => <Client key={c.socketId} client={c} />);
    };

    const messagesList = () => {
        return state.messages.map(m => <Message key={m.id} message={m} />);
    };

    useEffect(() => {
        if (!listRef.current) return
        listRef.current.scroll({
            behavior: 'smooth',
            top: 100000000,
        });
    }, [listRef.current, state.messages]);

    useEffect(() => {
        if (!socket) return;
        (async () => {
            setLoading(true);
            const { delayTime, response } = await minimalDelayFunction(() => fetchTool(`room/${id}`));
            setTimeout(() => {
                setLoading(false);
                if (!response.status) {
                    navigate('/');
                    setError(showProblem(response));
                    return;
                }
                setRoomExisting(true);
            }, delayTime);
        })()
        return () => {
            socket.emit('room-exit', { username: username || socketId, roomId: id });
        }
    }, []);

    useEffect(() => {
        if (roomExisting && socket) {
            socket.emit('room-join', { socketId, username: username || socketId, roomId: id, avatar } as RoomJoinPayload);
        }
    }, [roomExisting]);

    // for self listeners
    useCreateListener('room-data', ({ src }: RoomDataPayload) => {
        setSrc(src);
    });


    // for all roommates listeners
    useCreateListener('room-exited', ({ clients, id, username }: RoomExitedPayload) => {
        dispatch({ type: 'CLIENTS_CHANGE', payload: clients });
        dispatch({ type: 'MESSAGES_PUSH', payload: { id, message: `${username} left the room!`, username: 'StreamCat' } })
    });
    useCreateListener('room-video-new', ({ src }: RoomVideoNewPayload) => {
        setSrc(src);
    });
    useCreateListener('chat-message-response', ({ id, message, username }: ChatMessagePayload) => {
        dispatch({ type: 'MESSAGES_PUSH', payload: { id, message, username } });
    })
    useCreateListener('client-settings-change', ({ clients }: ClientSettingsChangePayload) => {
        dispatch({ type: 'CLIENTS_CHANGE', payload: clients });
    })

    return (
        <>
            {roomExisting && <ContentWrapper withAside>
                <Main className="room">
                    <Section
                        title="Share this link to invite your friends to watch together:"
                        className="room__share-link"
                    >
                        <Paragraph indent={false} className="room__share-link-text">
                            {window.location.href}
                        </Paragraph>
                        <Button onClick={handleCopy} className="btn--icon room__share-link-btn" type="button">
                            <MdContentCopy className="room__copy-icon" />
                        </Button>
                    </Section>
                    <Section>
                        <Form
                            form={link}
                            options={{
                                path: `room/${id}/find-video`,
                                body: { link },
                                method: 'POST',
                            }}
                            validationSchema={LinkSchema}
                            className="room__video-form"
                            onSuccess={onSuccess}
                        >
                            <Input type="url" className="room__inp" value={link} onChange={e => setLink(e.target.value)} placeholder="Paste YouTube link here" />
                            <Button className="btn--icon" disabled={!link}>
                                <BiSearchAlt className="room__video-form-icon" />
                            </Button>
                        </Form>
                        <Player className="room__video" src={src} />
                    </Section>
                    <Section title="Online Clients">
                        <List className="room__clients-list">
                            {clientsList()}
                        </List>
                    </Section>
                </Main>
                <Aside className="room-aside">
                    <Section title="StreamCat Chat <3" className="room__chat" contentClassName="room__chat-content">
                        <List ref={listRef} className="room__chat-list">
                            {messagesList()}
                        </List>
                        <form
                            className="room__chat-panel"
                            onSubmit={handleMessageSend}
                        >
                            <Input
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Message"
                                className="room__chat-inp"
                            />
                            <Button type="submit" className="btn--icon room__chat-submit" disabled={message.length === 0}>
                                <TbSend className="room__chat-icon" />
                            </Button>
                        </form>
                    </Section>
                </Aside>
            </ContentWrapper>}
        </>
    );
};