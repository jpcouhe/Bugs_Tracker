import { User } from './user.interface';

export interface Project {
  id?: number;
  name?: string;
  description?: string;
  contribution?: [{
    user: User;
  }];
}
