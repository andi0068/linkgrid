'use client';
import { useRef } from 'react';

import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from '@/lib/components/drawer';
import useFormEventHandler from '@/lib/hooks/use-form-event-handler';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import ButtonContent from '@/components/ui/button-content';
import * as Links from '@/services/links';

type Fields = {
  url: string;
};

interface AddDrawerContentProps {
  user_uid: string;
  onSuccess?(): void;
}

export default function AddDrawerContent({ user_uid, onSuccess }: AddDrawerContentProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const form = useFormEventHandler<Fields>(
    async ({ fields }) => {
      try {
        await Links.create({ user_uid, ...fields });
        onSuccess?.();
        closeRef.current?.click();
      } catch (err) {
        window.alert('Failed to created.');
      }
    },
    [user_uid, onSuccess],
  );

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Enter URL</DrawerTitle>
      </DrawerHeader>
      <form onSubmit={form.onSubmit}>
        <DrawerBody>
          <Input
            type="url"
            name="url"
            placeholder="URL"
            required
            autoComplete="off"
            autoFocus
            className="bg-background-tertiary"
          />
        </DrawerBody>
        <DrawerFooter>
          <Button type="submit" size="lg" disabled={form.state.loading} className="rounded-full">
            <ButtonContent loading={form.state.loading}>Add</ButtonContent>
          </Button>
          <DrawerClose ref={closeRef} hidden>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </form>
    </DrawerContent>
  );
}
