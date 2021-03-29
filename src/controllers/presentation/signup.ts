import { MissingParamError, InvalidParamError } from './error'
import { badRequest, serverError } from '../presentation/helpres/http-helper'
import { EmailValidator, Controller, HttpRequest, HttpResponse } from './protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest : HttpRequest) : HttpResponse {
    try {
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
    } catch (error) {
      return serverError()
    }
  }
}
