import type { Metadata } from 'next';
import Link from 'next/link';

import { Root, Header, Title, Description, Footer, FootCopy } from '@/components/auth';
import Container from '@/components/layouts/container';
import { siteConfig } from '@/config/site';
import { urlConfig } from '@/config/url';

import Form from './form';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUp() {
  return (
    <Container>
      <Root>
        <Header>
          <Title>Join {siteConfig.name}</Title>
          <Description>Sign up for free!</Description>
        </Header>
        <Form />
        <Footer>
          <FootCopy>
            Already have an account?&nbsp;
            <Link href={urlConfig.auth.login} className="underline text-foreground-accent">
              Log in
            </Link>
          </FootCopy>
        </Footer>
      </Root>
    </Container>
  );
}
