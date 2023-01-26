import { Image } from '../common/Image';
import { List } from '../common/List';
import warningIcon from '../../assets/warning.svg';

interface Props {
    errors: string[];
}

export const ErrorsList = ({ errors }: Props) => {
    const errorsList = () => {
        return errors.join(' ');
    };

    return (
        <div className="form__errors shadow">
            <div className="form__errors-icon-wrapper">
                <Image alt="warning icon" src={warningIcon} isStatic className="form__errors-icon"/>
            </div>
            <List className="form__errors-list">
                {errorsList()}
            </List>
        </div>
    );
};