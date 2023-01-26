import { createContext, ReactNode, useContext, useState } from "react";
import { LoadingScreen } from "../components/popups/LoadingScreen";

interface Props {
    children: ReactNode;
}

interface PromisesContextValue {
    loading: boolean;
    error: string | null;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string| null) => void;
}

const defaultPromisesContextValue: PromisesContextValue = {
    error: null,
    loading: false,
    setError: undefined!,
    setLoading: undefined!,
};

export const PromisesContext = createContext<PromisesContextValue>(defaultPromisesContextValue);

export const usePromisesContext = () => useContext(PromisesContext);

export const PromisesProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Toasty na odpowiedź od servera
    // useEffect(() => {
    //     if(error && !loading) toast(error);
    //     setError(null);
    // }, [error, loading]);

    return (
        <PromisesContext.Provider value={{ error, loading, setError, setLoading }}>
            {children}
            {loading && <LoadingScreen />}
        </PromisesContext.Provider>
    );
};