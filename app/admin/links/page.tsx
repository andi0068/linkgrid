'use client';
import { FiPlus } from 'react-icons/fi';

import { Drawer, DrawerTrigger } from '@/lib/components/drawer';
import { Root, Header, Title } from '@/components/admin/links';
import Container from '@/components/layouts/container';
import Button from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import useUserLinksData from '@/hooks/use-user-links-data';
import { auth } from '@/services/auth';

import AddDrawerContent from './add-drawer-content';
import List from './list';

export default function Admin() {
  const user = {
    uid: auth.currentUser!.uid,
  };

  const links = useUserLinksData({ uid: user.uid }, []);

  return (
    <Container>
      <Root>
        <Header>
          <Title>Links</Title>
          <Drawer>
            <DrawerTrigger asChild>
              <Button type="button" size="lg" className="rounded-full">
                <Icon asChild className="mr-2">
                  <FiPlus />
                </Icon>
                Add link
              </Button>
            </DrawerTrigger>
            <AddDrawerContent user_uid={user.uid} onSuccess={links.onFetch} />
          </Drawer>
        </Header>
        <List items={links.data} onFetch={links.onFetch} />
      </Root>
    </Container>
  );
}
