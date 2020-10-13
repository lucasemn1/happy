import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  console.log(error);
  if(error instanceof ValidationError) {
    let errors: { [key: string]: string[] } = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: 'Validation fails', errors });
  }

  return response.status(500).json({message: 'INTERNAL SERVER ERROR'});
}

export default errorHandler;