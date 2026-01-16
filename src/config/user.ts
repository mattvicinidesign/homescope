export interface User {
  email: string;
  role: string;
}

// Mock user data - in production this would come from auth context/API
export const currentUser: User = {
  email: 'agent@homescope.com',
  role: 'Agent Pro',
};
