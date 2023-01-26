import { FormEvent, ReactNode, useState } from "react";
import { ZodSchema } from "zod/lib";
import { usePromisesContext } from "../../contexts/promises.context";
import { Method } from "../../types";
import { fetchTool, minimalDelayFunction } from "../../utils/api.util";
import { checkValidation } from "../../utils/validation.util";
import { ErrorsList } from "./ErrorsList";

interface Props {
    children: ReactNode;
    form: any;
    options: {
        path: string;
        method?: Method;
        body?: any;
    };
    validationSchema: ZodSchema;
    className?: string;
    errorNotificator?: boolean;
    onError?: (response: any) => void;
    onSuccess?: (response: any) => void;
}

export const Form = ({ children, form, options, onError, onSuccess, validationSchema, className, errorNotificator }: Props) => {
    const { path, body, method } = options;

    const { setError, setLoading } = usePromisesContext();

    const [errors, setErrors] = useState<string[] | null>(null);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();      
        const errors = checkValidation(form, validationSchema);
        if (errors) return setErrors(errors);
        setErrors(null);

        setLoading(true);
        const { delayTime, response } = await minimalDelayFunction(() => fetchTool(path, method, body));
        // const { delayTime, response } = { delayTime: 500, response: { status: false, results: 'To jest odpowiedz od servera!', message: 'Error to jest' } }

        setTimeout(() => {
            setLoading(false);
            if (!response.status) {
                if (errorNotificator) {
                    setErrors([response.message]);
                } else {
                    setError(response.message);
                }
                if (typeof onError !== 'function') return;
                return onError(response);
            }
            if (typeof onSuccess !== 'function') return;
            onSuccess(response);
        }, delayTime);
    };

    return (
        <form className={`form${className ? ' ' + className : ''}`} onSubmit={onSubmit}>
            {errors && <ErrorsList errors={errors} />}
            {children}
        </form>
    );
};