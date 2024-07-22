export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface LogoutBody {
  date: Date;
  email: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface User {
  userId: string;
  userName: string;
  email: string;
  password: string;
  fullName: string;
  age: number;
  gender: string;
  profileImage: string;
  coverImage: string;
  description: string;
  college: string;
  workPlace: string;
  location: string;
  personalWebSite: string;
  darkMode: boolean;
  creationDate: Date;
  updateDate: Date;
  lastLogoutDate: Date;
}

export interface UserWithToken extends User {
  accessToken: string;
}