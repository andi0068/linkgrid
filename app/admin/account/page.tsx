'use client';
import { Root, Title } from '@/components/admin/account';
import Container from '@/components/layouts/container';
import { auth } from '@/services/auth';

import Information from './information';
import Profile from './profile';
import Actions from './actions';

export default function Account() {
  const user = {
    uid: auth.currentUser!.uid,
    email: auth.currentUser!.email!,
  };

  return (
    <Container>
      <Root>
        <Title>My account</Title>
        <Information email={user.email} />
        <Profile uid={user.uid} />
        <Actions email={user.email} />
      </Root>
    </Container>
  );
}
