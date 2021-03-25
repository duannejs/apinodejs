import { HttpRequest, HttpResponse } from '../presentation/protocols/http'
import { MissingParamError } from './error/missing-param-error'
import { badRequest } from '../presentation/helpres/http-helper'

export class SignUpController {
  handle (httpRequest : HttpRequest) : HttpResponse {
    const requireFields = ['name', 'mail']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
