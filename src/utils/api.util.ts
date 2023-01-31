import { ClientResponse, ClientResponseError, Method, ServerErrorResponse } from '../types';
import { HOST_ADDRESS } from '../../config/config';

type UploadMethod = 'POST' | 'PATCH' | 'PUT';

const setErrorResponse = (response: Response, res: ServerErrorResponse): ClientResponseError => {
    console.warn(res.message);
    if (response.status === 400) return { message: res.message, status: false, problems: res.problems };
    return { message: res.message, status: false };
};

export async function minimalDelayFunction<T>(callback: Function): Promise<{ delayTime: number, response: ClientResponse<T> }> {
    const startTime = new Date().valueOf();
    const response = await callback();
    const endTime = new Date().valueOf();
    return {
        delayTime: endTime - startTime < 500 ? 500 - (endTime - startTime) : 0,
        response,
    };
};

export async function fetchTool<T>(path: string, method: Method = 'GET', body: any = undefined): Promise<ClientResponse<T>> {
    try {
        const headers = ['POST', 'PATCH', 'PUT'].includes(method) ? { 'Content-Type': 'application/json' } : undefined;

        const response = await fetch(`${HOST_ADDRESS}/${path[0] === '/' ? path.slice(1) : path}`, {
            method,
            headers: headers,
            body: body && JSON.stringify(body),
            credentials: 'include',
        });
        const res = await response.json();
        if (response.ok) return { ...res, status: true };
        return setErrorResponse(response, res);
    } catch (e) {
        return { message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
};

export async function fetchWithFileUpload<T>(path: string, method: UploadMethod = 'POST', body: FormData): Promise<ClientResponse<T>> {
    try {
        const response = await fetch(`${HOST_ADDRESS}/${path[0] === '/' ? path.slice(1) : path}`, {
            method,
            body,
            credentials: 'include',
        });
        const res = await response.json();
        if (response.ok) return { ...res, status: true };
        return setErrorResponse(response, res);
    } catch (error) {
        return { message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
};

export const showProblem = (response: ServerErrorResponse): string => {
    if (response.problems && response.problems.length !== 0) return `${response.message} ${response.problems.join(' ')}`;
    return response.message;
} 