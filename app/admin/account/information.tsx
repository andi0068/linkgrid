'use client';
import { Section, FormCard } from '@/components/admin/account';
import Input from '@/components/ui/input';
import * as Field from '@/components/providers/field';

interface InformationProps {
  email: string;
}

export default function Information({ email }: InformationProps) {
  return (
    <Section.Root>
      <Section.Title>My information</Section.Title>
      <form>
        <FormCard.Content>
          <Field.Provider name="email">
            <Field.Consumer>
              {(provided) => (
                <FormCard.Field.Root>
                  <FormCard.Field.Label {...provided.labelProps}>Email</FormCard.Field.Label>
                  <FormCard.Field.Control asChild>
                    <Input
                      type="email"
                      defaultValue={email}
                      placeholder="your@ema.il"
                      readOnly
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
      </form>
    </Section.Root>
  );
}
