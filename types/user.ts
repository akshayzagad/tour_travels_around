export interface userSignUp {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface userLogin {
  email: string;
  password: string;
}

export interface forgotPassword  {
  email: string;
}

export interface resetPassword {
  password: string;
  passwordConfirm: string;
}