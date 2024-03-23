import type { Metadata } from 'next';
import Link from 'next/link';
import { FiShare2, FiList, FiUser } from 'react-icons/fi';

import { Drawer, DrawerTrigger } from '@/lib/components/drawer';
import AuthHoc from '@/components/auth-hoc';
import { Header, Nav, Main } from '@/components/layouts/admin';
import Container from '@/components/layouts/container';
import NavLink from '@/components/ui/nav-link';
import Button from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { siteConfig } from '@/config/site';
import { urlConfig } from '@/config/url';

import ShareDrawerContent from './share-drawer-content';

export const metadata: Metadata = {
  title: `${siteConfig.name} Admin`,
  description: siteConfig.description,
};

const menus = [
  { label: 'Links', href: '/admin', icon: FiList, exact: true },
  { label: 'More', href: '/admin/more', icon: FiUser },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthHoc redirects={{ false: urlConfig.auth.login }}>
      <Header.Root>
        <Container>
          <Header.Content>
            <Header.Title>
              <Link href="/admin" className="block">
                {siteConfig.name}
              </Link>
            </Header.Title>
            <Drawer>
              <DrawerTrigger asChild>
                <Button type="button" variant="outline" className="rounded-full">
                  <Icon asChild className="mr-2">
                    <FiShare2 />
                  </Icon>
                  Share
                </Button>
              </DrawerTrigger>
              <ShareDrawerContent />
            </Drawer>
          </Header.Content>
        </Container>
      </Header.Root>
      <Nav.Root>
        <Container>
          <Nav.Content>
            {menus.map((menu) => (
              <Nav.Anchor asChild key={menu.label}>
                <NavLink href={menu.href} exact={menu.exact}>
                  <Icon asChild className="mr-2 text-[1.5em]">
                    <menu.icon />
                  </Icon>
                  {menu.label}
                </NavLink>
              </Nav.Anchor>
            ))}
          </Nav.Content>
        </Container>
      </Nav.Root>
      <Main>{children}</Main>
    </AuthHoc>
  );
}
