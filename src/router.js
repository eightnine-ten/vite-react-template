import User from './page/User';
import Role from './page/Role';

export const routers = [
  {
    path: '/role',
    component: Role,
    auth: false
  },
  {
    path: '/user',
    component: User
  }
];
