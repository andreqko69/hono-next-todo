export enum Page {
  SignIn = 'sign-in',
  SignUp = 'sign-up',
}

export enum Route {
  SignIn = `/${Page.SignIn}`,
  SignUp = `/${Page.SignUp}`,
}

export enum SearchParamKey {
  Status = 'status',
}

export enum StatusValue {
  SignupSuccess = 'signup-success',
}
