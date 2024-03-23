import type { Metadata } from 'next';
import Link from 'next/link';

import AuthHoc from '@/components/auth-hoc';
import * as Header from '@/components/layouts/admin/header';
import { Main } from '@/components/layouts/admin/main';
import Container from '@/components/layouts/container';
import { siteConfig } from '@/config/site';
import { urlConfig } from '@/config/url';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header.Root border="none">
        <Container>
          <Header.Content>
            <Header.Title>
              <Link href="/" className="block">
                {siteConfig.name}
              </Link>
            </Header.Title>
          </Header.Content>
        </Container>
      </Header.Root>
      <Main>
        <AuthHoc redirects={{ true: urlConfig.admin.root }}>{children}</AuthHoc>
      </Main>
    </>
  );
}
