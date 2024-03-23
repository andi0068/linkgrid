import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Root, Header, Title, Description } from '@/components/auth';
import Container from '@/components/layouts/container';
import { urlConfig } from '@/config/url';

interface PageProps {
  searchParams?: {
    email?: string;
  };
}

export default function EmailSent({ searchParams }: PageProps) {
  if (!searchParams?.email) redirect(urlConfig.auth.password_reset);
  return (
    <Container>
      <Root>
        <Header>
          <Title>Password reset email sent</Title>
          <Description>
            We&apos;ve sent you a link to reset your password. The link expires in 6 hours.
          </Description>
          <Description>
            Didn&apos;t get an email? Check your junk folder or&nbsp;
            <Link href={urlConfig.auth.password_reset} className="underline text-foreground-accent">
              request another link here
            </Link>
            .
          </Description>
          <Description>You can close this window now.</Description>
        </Header>
      </Root>
    </Container>
  );
}
