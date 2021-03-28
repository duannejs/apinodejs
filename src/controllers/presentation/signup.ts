import { HttpRequest, HttpResponse } from '../presentation/protocols/http'
import { MissingParamError } from './error/missing-param-error'
import { badRequest } from '../presentation/helpres/http-helper'
import { Controller } from '../presentation/protocols/controller'
import { EmailValidator } from './protocols/email-validator'
import { InvalidParamError } from './error/invalid-param-error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest : HttpRequest) : HttpResponse {
    const requireFields = ['name', 'mail', 'password', 'passwordConfirmation']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.mail)
    if (!isValid) {
      return badRequest(new InvalidParamError('mail'))
    }
  }
}
