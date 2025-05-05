import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
// import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

const NEW_LINE_REGEX = /\n/g;

@Catch(PrismaClientKnownRequestError) // To catch prisma exceptions
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const message = exception.message.replace(NEW_LINE_REGEX, '');

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;

        response.status(status).json({
          statusCode: status,
          message: message,
        });

        break;
      }

      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;

        const id = request.params.id;

        response.status(status).json({
          statusCode: status,
          // TODO: use meta instead of hardcoded "Note" here
          message: `Note with id ${id} not found`,
        });

        break;
      }

      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }

    super.catch(exception, host);
  }
}
