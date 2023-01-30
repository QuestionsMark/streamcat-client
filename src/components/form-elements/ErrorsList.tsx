import { Image } from '../common/Image';
import { List } from '../common/List';
import { TiWarningOutline } from 'react-icons/ti';

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
                <TiWarningOutline className="form__errors-icon"/>
            </div>
            <List className="form__errors-list">
                {errorsList()}
            </List>
        </div>
    );
};