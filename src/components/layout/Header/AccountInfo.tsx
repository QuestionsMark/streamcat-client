import { FaRegUserCircle } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { useSocket } from '../../../contexts/socket.context';
import { Button } from '../../common/Button';
import { MiniLoading } from '../../common/MiniLoading';

export const AccountInfo = () => {
    const { socketId } = useSocket();

    const onClick = () => {
        navigator.clipboard.writeText(socketId || '');
    };

    return (
        <div className="account-info">
            <FaRegUserCircle className="account-info__icon" />
            {socketId ? <div className="account-info__content">
                <p className="account-info__id">{socketId}</p>
                <Button className="btn--icon account-info__btn" onClick={onClick}>
                    <MdContentCopy className="account-info__copy-icon" />
                </Button>
            </div> : <MiniLoading />}
        </div>
    );
};