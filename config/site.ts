import { env } from '@/utils/generic-utils';

const { SITE_NAME, SITE_DOMAIN } = env();

export const siteConfig = {
  name: SITE_NAME,
  description: 'Manage your links',
  domain: SITE_DOMAIN,
};
