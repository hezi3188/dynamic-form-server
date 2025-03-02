import { Request, Response, Router, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from 'classes/AppError';
import FormSubmittion from 'models/formSubmittion';
import { formSubmittionSchema } from 'zod/formSubmittionSchema';
import { validateRequest } from 'middelwares/validateMiddelware';

const formSubmittionRouter = Router();

formSubmittionRouter.post(
    '/',
    validateRequest(formSubmittionSchema),
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { fields, formId } = req.body;

            const FormModel = FormSubmittion(formId);
            const newFormSubmission = new FormModel({ fields });
            await newFormSubmission.save();

            return res.status(StatusCodes.CREATED).json({ message: 'Form submission created successfully' });
        } catch (err: any) {
            next(err);
        }
    }
);

formSubmittionRouter.get('/:formId', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const formId = parseInt(req.params.formId, 10);

        if (isNaN(formId)) {
            throw new AppError('formId must be a number', StatusCodes.BAD_REQUEST);
        }

        const FormModel = FormSubmittion(formId.toString());
        const formSubmissions = await FormModel.find();

        return res.status(StatusCodes.OK).json(formSubmissions);
    } catch (err: any) {
        next(err);
    }
});

export default formSubmittionRouter;
