import type { Metadata } from 'next';
import Link from 'next/link';

import { Root, Header, Title, Description, Footer, FootCopy } from '@/components/auth';
import Container from '@/components/layouts/container';
import Button from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { urlConfig } from '@/config/url';

import Form from './form';

export const metadata: Metadata = {
  title: 'Log in',
};

export default function Login() {
  return (
    <Container>
      <Root>
        <Header>
          <Title>Welcome back</Title>
          <Description>Log in to your {siteConfig.name}</Description>
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
            <Link href={urlConfig.auth.password_reset}>Forgot password?</Link>
          </Button>
          <FootCopy>
            Don&apos;t have an account?&nbsp;
            <Link href={urlConfig.auth.signup} className="underline text-foreground-accent">
              Sign up
            </Link>
          </FootCopy>
        </Footer>
      </Root>
    </Container>
  );
}
