export enum Page {
  SignIn = 'sign-in',
  SignUp = 'sign-up',
  Dashboard = 'dashboard',
}

export enum Route {
  SignIn = `/${Page.SignIn}`,
  SignUp = `/${Page.SignUp}`,
  Dashboard = `/${Page.Dashboard}`,
}

export enum SearchParamKey {
  Status = 'status',
}

export enum StatusValue {
  SignupSuccess = 'signup-success',
}
