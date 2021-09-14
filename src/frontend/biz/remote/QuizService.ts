import { LeafQuiz } from '../../../server/dto/generated/LeafQuiz';


import { GeneratedBizBase } from '../../../framework/frontend/GeneratedBizBase';


import { Response } from '../../../framework/biz/Response';export class QuizService extends GeneratedBizBase{
  async getAll(): Promise<Response<LeafQuiz[]>> {
    return super.restCall<Response<LeafQuiz[]>>("get", "/v1/QuizService/getAll", arguments);
  }
  async getById(id: number): Promise<Response<LeafQuiz>> {
    return super.restCall<Response<LeafQuiz>>("get", "/v1/QuizService/getById", arguments);
  }
  async quizUpdate(id: number,title: string,contents: string,auther: string): Promise<Response<string>> {
    return super.restCall<Response<string>>("post", "/v1/QuizService/quizUpdate", arguments);
  }
}
