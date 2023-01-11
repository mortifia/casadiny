//extend req type
declare namespace Express {
  export interface Request {
    prisma: PrismaClient
  }
}
