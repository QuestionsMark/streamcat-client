import { useReducer } from "react";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { OpenValue } from "../../hooks/useOpen";
import { accountReducer, defaultAccountState } from "../../reducers/account.reducer";
import { AccountSettingsSchema } from "../../utils/validation.util";
import { Button } from "../common/Button";
import { Form } from "../form-elements/Form";
import { Input } from "../form-elements/Input";
import { IoClose } from 'react-icons/io5';
import { ClientResponseOK } from "../../types";
import { useSocket } from "../../contexts/socket.context";
import { useUser } from "../../contexts/user.context";

export const AccountSettingsPopup = ({ close, isOpen }: OpenValue) => {
    const { socketId } = useSocket();
    const { setAvatar, setUsername } = useUser();

    const [state, dispatch] = useReducer(accountReducer, defaultAccountState);

    const onSuccess = (response: ClientResponseOK<string>) => {
        setAvatar(state.avatar);
        setUsername(state.username);
        toast(response.results);
    };

    return (
        <Popup
            modal
            onClose={close}
            open={isOpen}
            closeOnDocumentClick={false}
            closeOnEscape={true}
            className="account-info__settings"
        >
            <Form
                form={state}
                options={{
                    path: `user/${socketId}/settings`,
                    body: state,
                    method: 'PUT',
                }}
                validationSchema={AccountSettingsSchema}
                onSuccess={onSuccess}
                className="account-info__settings-form"
            >
                <Button type="button" onClick={close} className="account-info__settings-close">
                    <IoClose className="account-info__settings-close-icon" />
                </Button>
                <h2 className="account-info__settings-title">Account Settings</h2>
                <Input type="url" value={state.avatar} onChange={e => dispatch({ type: 'AVATAR_CHANGE', payload: e.target.value })} placeholder="Avatar URL" className="account-info__settings-inp" />
                <Input type="string" value={state.username} onChange={e => dispatch({ type: 'USERNAME_CHANGE', payload: e.target.value })} placeholder="Username" className="account-info__settings-inp" />
                <Button type="submit" disabled={!state.avatar || !state.username} className="account-info__settings-submit">
                    Save
                </Button>
            </Form>
        </Popup>
    );
};