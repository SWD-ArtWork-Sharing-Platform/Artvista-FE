function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOT = '/';
const ROOT_ADMIN = '/admin';

export const PATH_AUTH = {
  signin: '/signin',
  signup: '/signup',
  signupInfo: '/signup/info',
};

export const PATH_SHOP = {
  root: "/",
  general: {
    discover: "/discover"
  }
};

export const PATH_ADMIN = {
  root: ROOT_ADMIN,
  dashboard: path(ROOT_ADMIN, "/dashboard")
};