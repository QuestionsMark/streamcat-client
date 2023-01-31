import { FormEvent, useEffect, useRef, useState } from "react";
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
import { checkValidation, LinkSchema, MessageSchema } from "../../utils/validation.util";
import { ChatMessagePayload, ClientResponseOK, ClientSettingsChangePayload, RoomDataPayload, RoomExitedPayload, RoomJoinPayload, RoomVideoNewPayload } from "../../types";
import { useRoom } from "../../contexts/room.context";
import { List } from "../common/List";
import { Client } from "../common/Client";
import { Aside } from "../layout/Aside";
import { TbSend } from 'react-icons/tb';
import { Message } from "../common/Message";

export const Room = () => {
    const { socket, socketId } = useSocket();
    const { username, avatar } = useUser();
    const { dispatch, state } = useRoom();

    const { id } = useParams();

    const listRef = useRef<HTMLUListElement>(null);

    const [link, setLink] = useState('');
    const [message, setMessage] = useState('');
    const [src, setSrc] = useState('');

    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const onSuccess = (response: ClientResponseOK<string>) => {
        console.log(response.results);
    };

    const handleMessageSend = async (e: FormEvent) => {
        e.preventDefault();
        const errors = checkValidation(message, MessageSchema);
        if (errors || !socket) return console.log(errors);
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
        socket.emit('room-join', { socketId, username: username || socketId, roomId: id, avatar } as RoomJoinPayload);
        return () => {
            socket.emit('room-exit', { username: username || socketId, roomId: id });
        }
    }, []);

    // for self listeners
    useCreateListener('room-data', ({ src }: RoomDataPayload) => {
        setSrc(src);
    });


    // for all roommates listeners
    useCreateListener('room-exited', ({ clients, id, username }: RoomExitedPayload) => {
        console.log();
        dispatch({ type: 'CLIENTS_CHANGE', payload: clients });
        dispatch({ type: 'MESSAGES_PUSH', payload: { id, message: `${username} left the room!`, username } })
    });
    useCreateListener('room-video-new', ({ src }: RoomVideoNewPayload) => {
        console.log(src);
        setSrc(src);
    });
    useCreateListener('chat-message-response', ({ id, message, username }: ChatMessagePayload) => {
        dispatch({ type: 'MESSAGES_PUSH', payload: { id, message, username } });
    })
    useCreateListener('client-settings-change', ({ clients }: ClientSettingsChangePayload) => {
        dispatch({ type: 'CLIENTS_CHANGE', payload: clients });
    })

    return (
        <ContentWrapper withAside>
            <Main className="room">
                <Section
                    title="Share this link to invite your friends to watch together:"
                    className="room__share-link"
                >
                    <Paragraph indent={false} className="room__share-link-text">
                        {window.location.href}
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
        </ContentWrapper>
    );
};