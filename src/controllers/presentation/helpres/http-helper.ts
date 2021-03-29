import { HttpResponse } from '../protocols/http'
import { ServerError } from '../error/server-error'

export const badRequest = (error : Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
