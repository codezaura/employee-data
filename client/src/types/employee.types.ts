export type Gender = "Male" | "Female" | "Other";

export type EmployeeId = string | undefined;

export interface EmployeeBaseData {
  avatarUrl: string;
  name: string;
  role: string;
  gender: Gender;
  experience: number;
  location: string;
}

export interface EmployeeData extends EmployeeBaseData {
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Employee extends EmployeeData {
  _id: string;
}
