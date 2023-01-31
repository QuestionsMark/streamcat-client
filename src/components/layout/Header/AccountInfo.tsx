import { FaRegUserCircle } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { useSocket } from '../../../contexts/socket.context';
import { Button } from '../../common/Button';
import { Loading } from '../../common/Loading';
import { RiSettings4Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useOpen } from '../../../hooks/useOpen';
import { AccountSettingsPopup } from '../../popups/AccountSettingsPopup';
import { useUser } from '../../../contexts/user.context';
import { Image } from '../../common/Image';

export const AccountInfo = () => {
    const { socketId } = useSocket();
    const { avatar, username } = useUser();

    const { open, close, isOpen } = useOpen();

    const onClick = () => {
        navigator.clipboard.writeText(socketId || '');
        toast('Successfully copied!');
    };

    return (
        <div className="account-info">
            <Button type="button" onClick={open} className="btn--icon account-info__settings-btn" disabled={isOpen}>
                <RiSettings4Fill className="account-info__settings-icon" />
            </Button>
            {avatar ? <Image alt="Account avatar" src={avatar} isStranger className="account-info__icon" /> : <FaRegUserCircle className="account-info__icon" />}
            {socketId ? <div className="account-info__content">
                <p className="account-info__id">{username || socketId}</p>
                <Button className="btn--icon account-info__btn" onClick={onClick} type="button">
                    <MdContentCopy className="account-info__copy-icon" />
                </Button>
            </div> : <Loading className="account-info__loading" />}
            <AccountSettingsPopup close={close} isOpen={isOpen} open={open} />
        </div>
    );
};