export interface AccountState {
    username: string;
    avatar: string;
}

export const defaultAccountState: AccountState = {
    avatar: '',
    username: '',
};

interface AvatarChange {
    type: 'AVATAR_CHANGE';
    payload: string;
}

interface UsernameChange {
    type: 'USERNAME_CHANGE';
    payload: string;
}

export type AccountAction = AvatarChange | UsernameChange;

export const accountReducer = (state: AccountState, action: AccountAction): AccountState => {
    switch (action.type) {
        case 'AVATAR_CHANGE': {
            return { ...state, avatar: action.payload };
        }

        case 'USERNAME_CHANGE': {
            return { ...state, username: action.payload };
        }
    
        default:
            return state;
    }
};