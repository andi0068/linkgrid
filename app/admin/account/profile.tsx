'use client';
import Image from 'next/image';
import { useRef } from 'react';

import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/lib/components/drawer';
import useFormEventHandler from '@/lib/hooks/use-form-event-handler';
import useAsyncEventHandler from '@/lib/hooks/use-async-event-handler';
import useInputImage from '@/lib/hooks/use-input-image';
import { Section, FormCard } from '@/components/admin/account';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import ButtonContent from '@/components/ui/button-content';
import UserCircle from '@/components/svgs/user-circle';
import * as Field from '@/components/providers/field';
import useUserData from '@/hooks/use-user-data';
import * as Users from '@/services/users';
import { siteConfig } from '@/config/site';

type Fields = {
  username: string;
  profile_title: string;
  bio: string;
  image?: File;
};

interface ProfileProps {
  uid: string;
}

export default function Profile({ uid }: ProfileProps) {
  const user = useUserData({ uid }, [uid]);

  const form = useFormEventHandler<Fields>(
    async ({ fields }) => {
      if (!fields.image?.name) delete fields.image;

      try {
        await Users.update({ uid, ...fields });
        user.onFetch();
      } catch (err) {
        window.alert(Users.getErrorCode(err, 'Failed to save changes.'));
      }
    },
    [uid],
  );

  const loading = user.loading || form.state.loading;

  return (
    <Section.Root>
      <Section.Title>My {siteConfig.name}</Section.Title>
      <form
        key={form.key}
        onSubmit={form.onSubmit}
        onReset={form.onReset}
        className="aria-busy:cursor-wait"
        aria-busy={loading}
      >
        <FormCard.Content>
          <FieldImage
            key={user.data?.image}
            uid={uid}
            defaultSrc={user.data?.image}
            disableRemoveButton={!user.data?.image}
            loading={loading}
            onFetch={user.onFetch}
          />
          <Field.Provider name="username" descriptionMounted>
            <Field.Consumer>
              {(provided) => (
                <FormCard.Field.Root>
                  <FormCard.Field.Label {...provided.labelProps}>Username</FormCard.Field.Label>
                  <FormCard.Field.Control asChild>
                    <Input
                      type="text"
                      defaultValue={user.data?.username}
                      placeholder="username"
                      required
                      autoComplete="off"
                      variant="flush"
                      size="none"
                      {...provided.inputProps}
                    />
                  </FormCard.Field.Control>
                  <FormCard.Field.Description {...provided.descriptionProps}>
                    Note: changing your username will also change your URL
                  </FormCard.Field.Description>
                </FormCard.Field.Root>
              )}
            </Field.Consumer>
          </Field.Provider>
          <Field.Provider name="profile_title">
            <Field.Consumer>
              {(provided) => (
                <FormCard.Field.Root>
                  <FormCard.Field.Label {...provided.labelProps}>
                    Profile Title
                  </FormCard.Field.Label>
                  <FormCard.Field.Control asChild>
                    <Input
                      type="text"
                      defaultValue={user.data?.profile_title}
                      placeholder="John Doe"
                      required
                      autoComplete="off"
                      variant="flush"
                      size="none"
                      {...provided.inputProps}
                    />
                  </FormCard.Field.Control>
                </FormCard.Field.Root>
              )}
            </Field.Consumer>
          </Field.Provider>
          <Field.Provider name="bio">
            <Field.Consumer>
              {(provided) => (
                <FormCard.Field.Root>
                  <FormCard.Field.Label {...provided.labelProps}>Bio</FormCard.Field.Label>
                  <FormCard.Field.Control asChild>
                    <Input
                      type="text"
                      defaultValue={user.data?.bio}
                      autoComplete="off"
                      variant="flush"
                      size="none"
                      {...provided.inputProps}
                    />
                  </FormCard.Field.Control>
                </FormCard.Field.Root>
              )}
            </Field.Consumer>
          </Field.Provider>
        </FormCard.Content>
        <FormCard.Footer>
          <Button type="submit" size="lg" disabled={loading} className="rounded-xl">
            <ButtonContent loading={loading}>Save changes</ButtonContent>
          </Button>
          <Button
            type="reset"
            variant="none"
            size="lg"
            color="accent"
            className="underline rounded-xl"
          >
            Reset form
          </Button>
        </FormCard.Footer>
      </form>
    </Section.Root>
  );
}

interface FieldImageProps {
  uid: string;
  defaultSrc?: string;
  disableRemoveButton?: boolean;
  loading?: boolean;
  onFetch?(): void;
}

function FieldImage({ uid, defaultSrc, disableRemoveButton, loading, onFetch }: FieldImageProps) {
  const input = useInputImage({
    defaultSrc,
    rules: {
      typeStartsWith: 'image/',
      maxSize: 999999,
    },
    messages: {
      size: `Please upload a picture smaller than 1 MB.`,
    },
  });

  return (
    <Field.Provider name="image" messageMounted={!!input.state.error}>
      <Field.Consumer>
        {(provided) => (
          <FormCard.ImageField.Root>
            <span className="shrink-0 overflow-hidden relative h-fit">
              <input
                key={input.key}
                ref={input.ref}
                type="file"
                accept="image/*"
                onChange={input.onChange}
                className="cursor-pointer opacity-0 absolute top-0 left-0 size-full"
                aria-label="Profile Picture"
                {...provided.inputProps}
              />
              <FormCard.ImageField.Image asChild>
                {loading ? (
                  <div className="bg-background-tertiary" />
                ) : input.state.src ? (
                  <Image alt="Profile Picture" src={input.state.src} priority />
                ) : (
                  <UserCircle />
                )}
              </FormCard.ImageField.Image>
            </span>
            <FormCard.ImageField.Content>
              <Button type="button" size="lg" onClick={input.onTrigger} className="rounded-full">
                Pick an image
              </Button>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    disabled={disableRemoveButton}
                    className="rounded-full disabled:opacity-50"
                  >
                    Remove
                  </Button>
                </DrawerTrigger>
                <RemoveImageDrawerContent uid={uid} onSuccess={onFetch} />
              </Drawer>
              {input.state.error && (
                <FormCard.Field.Description
                  className="text-foreground-danger"
                  {...provided.messageProps}
                >
                  {input.state.error}
                </FormCard.Field.Description>
              )}
            </FormCard.ImageField.Content>
          </FormCard.ImageField.Root>
        )}
      </Field.Consumer>
    </Field.Provider>
  );
}

interface RemoveImageDrawerContentProps {
  uid: string;
  onSuccess?(): void;
}

function RemoveImageDrawerContent({ uid, onSuccess }: RemoveImageDrawerContentProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const [{ loading }, onRemove] = useAsyncEventHandler(
    {
      uid,
      image: null,
      handler: Users.update,
      onSuccess() {
        onSuccess?.();
        closeRef.current?.click();
      },
      onError() {
        window.alert('Failed to delete your profile picture.');
      },
    },
    [uid, onSuccess],
  );

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Delete your profile picture</DrawerTitle>
      </DrawerHeader>
      <DrawerFooter>
        <Button
          type="button"
          variant="outline"
          size="lg"
          color="danger"
          disabled={loading}
          onClick={onRemove}
          className="rounded-full"
        >
          <ButtonContent loading={loading}>Continue</ButtonContent>
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
