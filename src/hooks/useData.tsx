import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { fetchTool } from "../utils/api.util";

const getData = async (path: string, setState: Dispatch<SetStateAction<any>>, ref: RefObject<HTMLElement>) => {
    const startTime = new Date().valueOf();
    const response = await fetchTool(path);
    if (!response.status || !ref.current) return;
    const endTime = new Date().valueOf();
    setTimeout(() => {
        if (!ref.current) return;
        setState(response.results);
    }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
};

export function useData<T>(path: string, ref: RefObject<HTMLElement>, dependencies: any[] = [], reset: boolean = false): { data: T | null, refresh: () => void } {
    const [data, setData] = useState<T | null>(null);
    const [reload, setReload] = useState<boolean | null>(null);

    const refresh = () => {
        setReload(state => state === null ? false : !state);
    };

    useEffect(() => {
        if (reload === false || reload === true) {
            getData(path, setData, ref);
        }
    }, [reload]);

    useEffect(() => {
        if (reset) {
            setData(null);
        }
        getData(path, setData, ref);
    }, [...dependencies]);
    return { data, refresh };
};