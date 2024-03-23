'use client';
import { useRouter } from 'next/navigation';

import useFormEventHandler from '@/lib/hooks/use-form-event-handler';
import { Form, Message } from '@/components/auth';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import ButtonContent from '@/components/ui/button-content';
import * as Auth from '@/services/auth';
import { urlConfig } from '@/config/url';

type Fields = {
  email: string;
};

export default function PasswordResetForm() {
  const router = useRouter();

  const form = useFormEventHandler<Fields>(async ({ fields, setError }) => {
    try {
      await Auth.sendPasswordResetEmail(fields);
      toSuccessPage(fields.email);
    } catch (err) {
      setError(Auth.getErrorCode(err, 'Unknown Error.'));
    }
  }, []);

  function toSuccessPage(email: string) {
    router.push(urlConfig.auth.password_reset_email_sent(email));
  }

  return (
    <Form asChild>
      <form onSubmit={form.onSubmit}>
        <Message error={form.state.error} />
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          required
          autoComplete="off"
          className="bg-background-secondary"
        />
        <Button type="submit" size="lg" disabled={form.state.loading} className="rounded-full">
          <ButtonContent loading={form.state.loading}>Reset password</ButtonContent>
        </Button>
      </form>
    </Form>
  );
}
