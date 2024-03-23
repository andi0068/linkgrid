import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Header, Main, Section, Anchor, Footer } from '@/components/profile';
import Container from '@/components/layouts/container';
import Button from '@/components/ui/button';
import UserCircle from '@/components/svgs/user-circle';
import * as Users from '@/services/users';
import * as Links from '@/services/links';
import { siteConfig } from '@/config/site';
import { urlConfig } from '@/config/url';

interface PageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const user = await Users.get.byUsernameOne(params.username);

  return {
    title: user?.profile_title || `${siteConfig.name} Account`,
    description: user?.bio || siteConfig.description,
  };
}

export default async function Profile({ params }: PageProps) {
  const user = await Users.get.byUsernameOne(params.username);

  if (!user) notFound();

  if (user.image) user.image = await Users.storage.get(user.uid, user.image);
  const links = await Links.get.byUserUid(user.uid);

  return (
    <>
      <Header.Root>
        <Container>
          <Header.Content>
            <Header.Image asChild>
              {user.image ? (
                <Image alt={user.username} src={user.image} priority />
              ) : (
                <UserCircle />
              )}
            </Header.Image>
            <Header.Title>{user.profile_title}</Header.Title>
            <Header.Description>{user.bio}</Header.Description>
          </Header.Content>
        </Container>
      </Header.Root>
      <Main>
        <Container>
          <Section.Root>
            <Section.Content>
              {links.map((link) => (
                <Anchor key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </Anchor>
              ))}
            </Section.Content>
          </Section.Root>
        </Container>
      </Main>
      <Footer.Root>
        <Container>
          <Footer.Content>
            <Button asChild size="lg" bg="tertiary" className="rounded-full">
              <Link href={urlConfig.auth.signup}>Create your {siteConfig.name}</Link>
            </Button>
          </Footer.Content>
        </Container>
      </Footer.Root>
    </>
  );
}
