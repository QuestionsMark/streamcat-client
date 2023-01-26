import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ZodSchema } from 'zod/lib';

export function checkValidation(data: any, schema: ZodSchema): string[] | null {
    const results = schema.safeParse(data);
    return results.success ? null : fromZodError(results.error, { issueSeparator: '<;>' }).message.replace('Validation error: ', '').split('<;>').map(e => e.slice(0, e.indexOf('. at') + 1));
};

//Schemas