'use client';
import Image from 'next/image';
import { FiUser, FiLogOut } from 'react-icons/fi';

import { Root, Header, Card } from '@/components/admin/more';
import Container from '@/components/layouts/container';
import UserCircle from '@/components/svgs/user-circle';
import useUserData from '@/hooks/use-user-data';
import { auth } from '@/services/auth';
import { siteConfig } from '@/config/site';
import { urlConfig } from '@/config/url';

const links = [
  {
    name: 'Account',
    items: [{ label: 'My account', href: urlConfig.admin.account, icon: FiUser }],
  },
  {
    name: 'Session',
    items: [{ label: 'Sign out', href: urlConfig.logout, icon: FiLogOut }],
  },
];

export default function More() {
  const user = useUserData({ uid: auth.currentUser!.uid }, []);
  return (
    <Container>
      <Root>
        <Header.Root>
          <Header.Image asChild>
            {user.loading ? (
              <div className="bg-background-tertiary" />
            ) : user.data?.image ? (
              <Image alt="Profile Picture" src={user.data.image} priority />
            ) : (
              <UserCircle />
            )}
          </Header.Image>
          {user.data && (
            <Header.Content>
              <Header.Title>{user.data.profile_title || `${siteConfig.name} Account`}</Header.Title>
              {user.data.username && (
                <Header.Description>{urlConfig.profile(user.data.username)}</Header.Description>
              )}
            </Header.Content>
          )}
        </Header.Root>
        {links.map((group) => (
          <Card.Root key={group.name}>
            <Card.Title>{group.name}</Card.Title>
            <Card.List>
              {group.items.map((item) => (
                <Card.Item key={item.label} href={item.href} icon={<item.icon />}>
                  {item.label}
                </Card.Item>
              ))}
            </Card.List>
          </Card.Root>
        ))}
      </Root>
    </Container>
  );
}
