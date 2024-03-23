'use client';
import { useRef } from 'react';

import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/lib/components/drawer';
import useAsyncEventHandler from '@/lib/hooks/use-async-event-handler';
import Button from '@/components/ui/button';
import ButtonContent from '@/components/ui/button-content';
import * as Links from '@/services/links';

interface DeleteDrawerContentProps {
  id: string;
  onSuccess?(): void;
}

export default function DeleteDrawerContent({ id, onSuccess }: DeleteDrawerContentProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const [{ loading }, onRemove] = useAsyncEventHandler(
    {
      id,
      handler: Links.remove,
      onSuccess() {
        onSuccess?.();
        closeRef.current?.click();
      },
      onError() {
        window.alert('Failed to deleted.');
      },
    },
    [id, onSuccess],
  );

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Do you really want to delete this link?</DrawerTitle>
      </DrawerHeader>
      <DrawerFooter>
        <Button
          type="button"
          size="lg"
          disabled={loading}
          onClick={onRemove}
          className="rounded-full"
        >
          <ButtonContent loading={loading}>Delete</ButtonContent>
        </Button>
        <DrawerClose asChild ref={closeRef}>
          <Button type="button" variant="outline" size="lg" className="rounded-full">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
