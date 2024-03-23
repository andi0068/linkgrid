import type { Metadata } from 'next';
import Link from 'next/link';

import { Root, Header, Title, Description, Footer } from '@/components/auth';
import Container from '@/components/layouts/container';
import Button from '@/components/ui/button';
import { urlConfig } from '@/config/url';

import Form from './form';

export const metadata: Metadata = {
  title: 'Reset Password',
};

export default function PasswordReset() {
  return (
    <Container>
      <Root>
        <Header>
          <Title>Reset your password</Title>
          <Description>
            Enter your <strong>email address</strong> that you used to register. We&apos;ll send you
            an email with your email address and a link to reset your password.
          </Description>
        </Header>
        <Form />
        <Footer>
          <Button
            asChild
            variant="none"
            size="lg"
            color="accent"
            className="underline rounded-full"
          >
            <Link href={urlConfig.auth.login}>Back to login</Link>
          </Button>
        </Footer>
      </Root>
    </Container>
  );
}
