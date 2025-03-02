import { z } from 'zod';

export const formSubmittionSchema = z.object({
    formId: z.string().min(1, 'formId is required'),
    fields: z.record(z.string(), z.any()).refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field is required',
    }),
});
