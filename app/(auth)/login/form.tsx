'use client';
import useFormEventHandler from '@/lib/hooks/use-form-event-handler';
import { Form, Message } from '@/components/auth';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import ButtonContent from '@/components/ui/button-content';
import * as Auth from '@/services/auth';

type Fields = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const form = useFormEventHandler<Fields>(async ({ fields, setError }) => {
    try {
      await Auth.signIn(fields);
    } catch (err) {
      setError(Auth.getErrorCode(err, 'Unknown Error.'));
    }
  }, []);

  return (
    <Form asChild>
      <form onSubmit={form.onSubmit}>
        <Message error={form.state.error} />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="bg-background-secondary"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="bg-background-secondary"
        />
        <Button type="submit" size="lg" disabled={form.state.loading} className="rounded-full">
          <ButtonContent loading={form.state.loading}>Log in</ButtonContent>
        </Button>
      </form>
    </Form>
  );
}
