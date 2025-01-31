export enum AuthErrorMessage {
  UserWithThisEmailAlreadyExists = 'User with this email already exists',
  YouMustAcceptTheTermsAndConditions = 'You must accept the terms and conditions',
  PasswordsDoNotMatch = "Passwords don't match",
  InvalidEmailFormat = 'Invalid email format',
  FirstNameIsTooShort = 'First name is too short',
  LastNameIsTooShort = 'Last name is too short',
  PasswordIsRequired = 'Password is required',
  PasswordMustBeAtLeast8Characters = 'Password must be at least 8 characters',
  InvalidCredentials = 'Invalid credentials',
  UserIsDeleted = 'User is deleted',
  UserWithThisEmailDoesNotExist = 'User with this email does not exist',
  SomethingWentWrongDuringSignIn = 'Something went wrong during sign in',
}
