import express from 'express';
import { errorHandler } from './web_handler';
import { LeafQuiz } from '../../server/dto/generated/LeafQuiz';
import { AuthService } from '../../server/biz/AuthService';
import { QuizService } from '../../server/biz/QuizService';
import { TestService } from '../../server/biz/TestService';


export const generatedRest = express.Router();

generatedRest.post("/v1/AuthService/login",
async (req: express.Request, res: express.Response) => {
  const biz = new AuthService();
  biz.login(req.body[0] as string,req.body[1] as string)
    .then(result => res.send(result))
    .catch(error => errorHandler(res, error));
});

generatedRest.post("/v1/AuthService/createAccount",
async (req: express.Request, res: express.Response) => {
  const biz = new AuthService();
  biz.createAccount(req.body[0] as string,req.body[1] as string,req.body[2] as string)
    .then(result => res.send(result))
    .catch(error => errorHandler(res, error));
});



generatedRest.get("/v1/QuizService/getAll",
async (req: express.Request, res: express.Response) => {
  const biz = new QuizService();
  biz.getAll()
    .then(result => res.send(result))
    .catch(error => errorHandler(res, error));
});

generatedRest.get("/v1/QuizService/getById",
async (req: express.Request, res: express.Response) => {
  const biz = new QuizService();
  biz.getById(parseFloat(req.query[0] as string) as number)
    .then(result => res.send(result))
    .catch(error => errorHandler(res, error));
});

generatedRest.post("/v1/QuizService/quizUpdate",
async (req: express.Request, res: express.Response) => {
  const biz = new QuizService();
  biz.quizUpdate(req.body[0] as LeafQuiz)
    .then(result => res.send(result))
    .catch(error => errorHandler(res, error));
});



generatedRest.get("/v1/TestService/getByNote",
async (req: express.Request, res: express.Response) => {
  const biz = new TestService();
  biz.getByNote(req.query[0] as string)
    .then(result => res.send(result))
    .catch(error => errorHandler(res, error));
});

generatedRest.get("/v1/TestService/getAll",
async (req: express.Request, res: express.Response) => {
  const biz = new TestService();
  biz.getAll()
    .then(result => res.send(result))
    .catch(error => errorHandler(res, error));
});



