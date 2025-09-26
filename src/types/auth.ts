export type UserRole = 'Admin' | 'Cuidador' | 'Responsavel' | 'Student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  cuidador_id?: string;
  responsavel_id?: string;
  cuidador?: User;
  responsavel?: User;
  avatar?: string;
  dateOfBirth?: Date;
  specialNeeds?: string;
}

export interface Nota {
  id: string;
  student_id: string;
  student?: Student;
  subject: string;
  value: number;
  maxValue?: number;
  date: Date;
  observation?: string;
}

export interface Laudo {
  id: string;
  student_id: string;
  student?: Student;
  description: string;
  date: Date;
  type: string;
  attachments?: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}