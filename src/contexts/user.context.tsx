import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface UserContextValue {
    username?: string;
    avatar?: string;
    setUsername: Dispatch<SetStateAction<string | undefined>>;
    setAvatar: Dispatch<SetStateAction<string | undefined>>;
}

interface Props {
    children: ReactNode;
}

const UserContext = createContext<UserContextValue>(null!);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [avatar, setAvatar] = useState<string | undefined>(undefined);

    return (
        <UserContext.Provider value={{ avatar, username, setAvatar, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};