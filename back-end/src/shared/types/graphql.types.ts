import { Request, Response } from 'express';

export interface GraphQLContext {
  req: RequestWithCookies;
  res: Response;
}

interface RequestWithCookies extends Request {
  cookies: Record<string, string | undefined>;
}
