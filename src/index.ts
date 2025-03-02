import express, { Application } from 'express';
import { errorMiddleware } from './middelwares/errorMiddelware';
import loggerMiddleware from 'middelwares/loggerMiddelware';
import configs from 'config';
import formSubmittionRouter from 'routes/formSubmittionRouter';
import cors from 'cors';
configs();
const app: Application = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/formSubmittion', formSubmittionRouter);

app.get('/health', (req, res) => {
    res.send('Server is up and running');
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

export default app;
