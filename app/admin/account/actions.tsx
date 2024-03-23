'use client';
import { useRouter } from 'next/navigation';

import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/lib/components/drawer';
import useAsyncEventHandler from '@/lib/hooks/use-async-event-handler';
import { Section, Card } from '@/components/admin/account';
import Button from '@/components/ui/button';
import ButtonContent from '@/components/ui/button-content';
import * as Auth from '@/services/auth';
import { siteConfig } from '@/config/site';
import { urlConfig } from '@/config/url';

interface ActionsProps {
  email: string;
}

export default function Actions({ email }: ActionsProps) {
  return (
    <Section.Root>
      <Section.Title>Account actions</Section.Title>
      <Card.Root>
        <Card.Title>Reset password</Card.Title>
        <Card.Description>Reset the password for this account.</Card.Description>
        <Card.Footer>
          <Drawer>
            <DrawerTrigger asChild>
              <Button type="button" variant="outline" size="lg" className="rounded-full">
                Reset Password
              </Button>
            </DrawerTrigger>
            <ResetPasswordDrawerContent email={email} />
          </Drawer>
        </Card.Footer>
      </Card.Root>
      <Card.Root>
        <Card.Title>Delete forever</Card.Title>
        <Card.Description>Permanently delete your account.</Card.Description>
        <Card.Footer>
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="lg"
                color="danger"
                disabled
                className="rounded-full disabled:opacity-50"
              >
                Delete account
              </Button>
            </DrawerTrigger>
            <DeleteAccountDrawerContent />
          </Drawer>
        </Card.Footer>
      </Card.Root>
    </Section.Root>
  );
}

interface ResetPasswordDrawerContentProps {
  email: string;
}

function ResetPasswordDrawerContent({ email }: ResetPasswordDrawerContentProps) {
  const router = useRouter();

  const [{ loading }, onReset] = useAsyncEventHandler(
    {
      email,
      handler: Auth.sendPasswordResetEmail,
      onSuccess: toSuccessPage,
      onError() {
        window.alert('Failed to reset your password.');
      },
    },
    [email],
  );

  function toSuccessPage() {
    Auth.signOut().then(() => router.push(urlConfig.auth.password_reset_email_sent(email)));
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Reset your password</DrawerTitle>
      </DrawerHeader>
      <DrawerFooter>
        <Button
          type="button"
          size="lg"
          disabled={loading}
          onClick={onReset}
          className="rounded-full"
        >
          <ButtonContent loading={loading}>Continue</ButtonContent>
        </Button>
        <DrawerClose asChild>
          <Button type="button" variant="outline" size="lg" className="rounded-full">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}

function DeleteAccountDrawerContent() {
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Delete your account</DrawerTitle>
        <DrawerDescription>
          If you continue, your {siteConfig.name} account, all your data will be permanently
          deleted.
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button type="button" variant="outline" size="lg" color="danger" className="rounded-full">
          Continue
        </Button>
        <DrawerClose asChild>
          <Button type="button" variant="outline" size="lg" className="rounded-full">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
