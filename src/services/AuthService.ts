import { User } from "../models/User";
import type { IUser } from "../models/User";

const USERS_KEY = "hs_users";
const SESSION_KEY = "hs_current_user";


export interface IAuthService {
  register(user: IUser): { success: boolean; message: string };
  login(email: string, password: string): { success: boolean; message: string };
  logout(): void;
  getCurrentUser(): User | null;
  updateCurrentUser(updated: Partial<IUser>): User | null;
  isAuthenticated(): boolean;
}


class AuthServiceImpl implements IAuthService {
  private readAllUsers(): IUser[] {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as IUser[];
    } catch {
      return [];
    }
  }

  private writeAllUsers(users: IUser[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  register(user: IUser): { success: boolean; message: string } {
    const users = this.readAllUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );
    if (exists) {
      return { success: false, message: "Nalog sa ovim email-om već postoji." };
    }
    users.push(user);
    this.writeAllUsers(users);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { success: true, message: "Uspešna registracija!" };
  }

  login(email: string, password: string): { success: boolean; message: string } {
    const users = this.readAllUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, message: "Pogrešan email ili lozinka." };
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    return { success: true, message: "Uspešna prijava!" };
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as IUser;
      return User.fromPlain(parsed);
    } catch {
      return null;
    }
  }

  updateCurrentUser(updated: Partial<IUser>): User | null {
    const current = this.getCurrentUser();
    if (!current) return null;
    const merged: IUser = { ...current, ...updated };
    localStorage.setItem(SESSION_KEY, JSON.stringify(merged));

    const users = this.readAllUsers().map((u) =>
      u.email === current.email ? merged : u
    );
    this.writeAllUsers(users);

    return User.fromPlain(merged);
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export const authService: IAuthService = new AuthServiceImpl();