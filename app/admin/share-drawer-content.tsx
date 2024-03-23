'use client';
import Link from 'next/link';
import { useRef } from 'react';

import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/lib/components/drawer';
import CopyButton from '@/components/ui/copy-button';
import Button from '@/components/ui/button';
import ButtonContent from '@/components/ui/button-content';
import useUsernameData from '@/hooks/use-username-data';
import { auth } from '@/services/auth';
import { siteConfig } from '@/config/site';
import { urlConfig } from '@/config/url';

export default function ShareDrawerContent() {
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Share your {siteConfig.name}</DrawerTitle>
        <DrawerDescription>
          Get more visitors by sharing your {siteConfig.name} everywhere.
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <FooterContent />
      </DrawerFooter>
    </DrawerContent>
  );
}

function FooterContent() {
  const closeRef = useRef<HTMLButtonElement>(null);

  const username = useUsernameData({ uid: auth.currentUser!.uid }, []);

  return username.loading ? (
    <Button type="button" variant="outline" size="xl" disabled>
      <ButtonContent loading />
    </Button>
  ) : username.data ? (
    <CopyButton variant="outline" size="xl" data={urlConfig.profile(username.data)} />
  ) : (
    <>
      <DrawerClose ref={closeRef} hidden>
        Close
      </DrawerClose>
      <Button asChild variant="none" size="xl">
        <p role="alert">
          Sorry, it seems like your username hasn&apos;t been set yet. Please set your username
          through the&nbsp;
          <Link
            href={urlConfig.admin.account}
            onClick={() => closeRef.current?.click()}
            className="underline text-foreground-accent"
          >
            account settings
          </Link>
          &nbsp;to continue.
        </p>
      </Button>
    </>
  );
}
