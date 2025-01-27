export interface ProfileResponse {
  statusCode: number;
  description: string;
  data: Profile;
}

export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  onboarded: boolean;
}
export interface EditProfile {
  firstName: string;
  lastName: string;
}

export interface UpdateResponse {
  statusCode: number;
  description: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
