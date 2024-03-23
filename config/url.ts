import { siteConfig } from './site';

export const urlConfig = {
  profile: (username: string) => `${siteConfig.domain}/${username}`,
  auth: {
    login: '/login',
    signup: '/signup',
    password_reset: '/password-reset',
    password_reset_email_sent: (email: string) => `/password-reset/email-sent?email=${email}`,
  },
  admin: {
    root: '/admin',
    links: '/admin/links',
    more: '/admin/more',
    account: '/admin/account',
  },
  logout: '/logout',
};
