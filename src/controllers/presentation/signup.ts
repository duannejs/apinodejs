import { HttpRequest, HttpResponse } from '../presentation/protocols/http'
import { MissingParamError } from './error/missing-param-error'
import { badRequest } from '../presentation/helpres/http-helper'
import { Controller } from '../presentation/protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest : HttpRequest) : HttpResponse {
    const requireFields = ['name', 'mail', 'password', 'passwordConfirmation']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
