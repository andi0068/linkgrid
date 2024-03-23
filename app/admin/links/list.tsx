'use client';
import { useCallback, useRef } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { Drawer, DrawerTrigger } from '@/lib/components/drawer';
import useFormEventHandler from '@/lib/hooks/use-form-event-handler';
import { List, Item } from '@/components/admin/links';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import DraggableMark from '@/components/svgs/draggable-mark';
import * as Field from '@/components/providers/field';
import * as Links from '@/services/links';
import type { Link } from '@/services/links.types';

import DeleteDrawerContent from './delete-drawer-content';

interface LinkListProps {
  items: Link[];
  onFetch?(): void;
}

export default function LinkList({ items, onFetch }: LinkListProps) {
  return (
    <List>
      {items.map((item) => (
        <Item.Root key={item.id}>
          <Item.SideIcon className="cursor-grab text-foreground-secondary active:cursor-grabbing">
            <Icon asChild>
              <DraggableMark />
            </Icon>
          </Item.SideIcon>
          <Form id={item.id} title={item.title} url={item.url} onUpdated={onFetch} />
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                type="button"
                variant="none"
                size="none"
                className="rounded-none hover:bg-background-tertiary"
                aria-label="Delete"
              >
                <Item.SideIcon>
                  <Icon asChild>
                    <FiTrash2 />
                  </Icon>
                </Item.SideIcon>
              </Button>
            </DrawerTrigger>
            <DeleteDrawerContent id={item.id} onSuccess={onFetch} />
          </Drawer>
        </Item.Root>
      ))}
    </List>
  );
}

type Fields = {
  title: string;
  url: string;
};

interface FormProps extends Partial<Fields> {
  id: string;
  onUpdated?(): void;
}

function Form({ id, title, url, onUpdated }: FormProps) {
  const submitRef = useRef<HTMLButtonElement>(null);

  const form = useFormEventHandler<Fields>(
    async ({ fields }) => {
      try {
        await Links.update({ id, ...fields });
        onUpdated?.();
      } catch (err) {
        window.alert('Failed to save changes');
      }
    },
    [id, onUpdated],
  );

  const onBlur = useCallback(() => submitRef.current?.click(), []);

  return (
    <Item.Form asChild>
      <form
        onSubmit={form.onSubmit}
        className="aria-busy:cursor-wait"
        aria-busy={form.state.loading}
      >
        <Field.Provider name="title">
          <Field.Consumer>
            {(provided) => (
              <Item.Field.Root>
                <Item.Field.Control asChild>
                  <Input
                    type="text"
                    defaultValue={title}
                    placeholder="Title"
                    required
                    autoComplete="off"
                    variant="none"
                    size="none"
                    onBlur={onBlur}
                    className="font-semibold"
                    {...provided.inputProps}
                  />
                </Item.Field.Control>
                <Item.Field.RightIcon />
              </Item.Field.Root>
            )}
          </Field.Consumer>
        </Field.Provider>
        <Field.Provider name="url">
          <Field.Consumer>
            {(provided) => (
              <Item.Field.Root>
                <Item.Field.Control asChild>
                  <Input
                    type="url"
                    defaultValue={url}
                    placeholder="URL"
                    required
                    autoComplete="off"
                    variant="none"
                    size="none"
                    onBlur={onBlur}
                    className="font-medium"
                    {...provided.inputProps}
                  />
                </Item.Field.Control>
                <Item.Field.RightIcon />
              </Item.Field.Root>
            )}
          </Field.Consumer>
        </Field.Provider>
        <button ref={submitRef} type="submit" hidden>
          Save changes
        </button>
      </form>
    </Item.Form>
  );
}
