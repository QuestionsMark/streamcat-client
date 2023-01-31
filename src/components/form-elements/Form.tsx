import { FormEvent, ReactNode, useState } from "react";
import { ZodSchema } from "zod/lib";
import { usePromises } from "../../contexts/promises.context";
import { Method } from "../../types";
import { fetchTool, minimalDelayFunction, showProblem } from "../../utils/api.util";
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
    preErrorNotificator?: boolean;
    onError?: (response: any) => void;
    onSuccess?: (response: any) => void;
}

export const Form = ({ children, form, options, onError, onSuccess, validationSchema, className, errorNotificator, preErrorNotificator }: Props) => {
    const { path, body, method } = options;

    const { setError, setLoading } = usePromises();

    const [errors, setErrors] = useState<string[] | null>(null);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();      
        const errors = checkValidation(form, validationSchema);
        if (errors) {
            if (preErrorNotificator) return setErrors(errors);
            return setError(showProblem({ message: 'Creepy!', problems: errors }));
        };
        setErrors(null);

        setLoading(true);
        const { delayTime, response } = await minimalDelayFunction(() => fetchTool(path, method, body));

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