import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface UserContextValue {
    username: string;
    avatar: string;
    setUsername: Dispatch<SetStateAction<string>>;
    setAvatar: Dispatch<SetStateAction<string>>;
}

interface Props {
    children: ReactNode;
}

const UserContext = createContext<UserContextValue>(null!);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
    const [username, setUsername] = useLocalStorage<string>('username', '');
    const [avatar, setAvatar] = useLocalStorage<string>('avatar', '');

    return (
        <UserContext.Provider value={{ avatar, username, setAvatar, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};