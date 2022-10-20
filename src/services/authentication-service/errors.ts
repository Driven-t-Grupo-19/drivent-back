import { ApplicationError } from '@/protocols';

export function unregisteredUserError(): ApplicationError {
  return {
    name: 'InvalidCredentialsError',
    message: "You need to register that email!",
  };
}

export function wrongPasswordError(): ApplicationError {
  return {
    name: 'InvalidCredentialsError',
    message: 'Wrong password!',
  };
}
