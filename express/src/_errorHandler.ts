import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from './_error.js'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('errorHandler')
  if (res.headersSent) {
    return next(err)
  }
  if (err instanceof ErrorResponse) {
    console.error(err.toJson())
    res.status(err.code).json(err.toJson())
  }
  if (err instanceof SyntaxError) {
    console.error(err.message)
    res.status(400).json({ message: 'Invalid JSON hmmmmmmm' })
  }
  if (err instanceof Error) {
    console.error('error vanilla', err.message)
    switch (err.message) {
      case 'Bad Request':
        res.status(400).json(new ErrorResponse(400, 'Bad Request'))
        break
    }
  }
  console.error("err doesn't match anything", err)
  res.status(500).json({ message: 'Internal server error' })
}
