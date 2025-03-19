export enum Page {
  SignIn = 'auth/signin',
  SignUp = 'auth/signup',
  Dashboard = 'dashboard',
  Error = 'error',
}

export enum Route {
  SignIn = `/${Page.SignIn}`,
  SignUp = `/${Page.SignUp}`,
  Dashboard = `/${Page.Dashboard}`,
  Error = `/${Page.Error}`,
}

export enum SearchParamKey {
  Status = 'status',
}

export enum StatusValue {
  SignupSuccess = 'signup-success',
}
