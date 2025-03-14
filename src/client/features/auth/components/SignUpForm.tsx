'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

import Link from '@/client/components/Link/Link';
import { Button } from '@/client/components/ui/button';
import { Checkbox } from '@/client/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/client/components/ui/form';
import { IconNames } from '@/client/components/ui/icon';
import { Input } from '@/client/components/ui/input';
import { Label } from '@/client/components/ui/label';
import { signUp } from '@/client/features/auth/api/mutations';
import FormContainer from '@/client/features/auth/components/FormContainer';
import ErrorHandler from '@/client/lib/ErrorHandler';
import {
  Route,
  SearchParamKey,
  StatusValue,
} from '@/shared/navigation/constants';
import { signUpSchema } from '@/shared/validation/auth/schema';

type FormFields = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<FormFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const { trigger } = useSWRMutation('/api/v1/auth/register', signUp);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      setIsSubmitting(true);

      await trigger(data);

      router.push(
        `${Route.SignIn}?${SearchParamKey.Status}=${StatusValue.SignupSuccess}`
      );
    } catch (error: unknown) {
      ErrorHandler.handleFormError({ error, form });
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log('IconNames', IconNames);

  return (
    <FormContainer>
      <div className="flex w-full gap-14">
        <div className="hidden md:flex md:w-[50%]">
          <Image
            className="w-full"
            src="/images/auth/sign-up.png"
            alt="Sign in"
            width={433}
            height={652}
          />
        </div>
        <div className="flex flex-col w-full md:w-[50%] md:max-w-[450px] justify-center gap-4">
          <h2 className="text-4xl font-bold">Sign Up</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        iconName={IconNames.EditNameSolid}
                        placeholder="First name"
                      />
                    </FormControl>
                    {form.formState.errors.firstName && (
                      <FormMessage>
                        {form.formState.errors.firstName.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        iconName={IconNames.EditNameOutlined}
                        placeholder="Last name"
                      />
                    </FormControl>
                    {form.formState.errors.lastName && (
                      <FormMessage>
                        {form.formState.errors.lastName.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        iconName={IconNames.LetterSolid}
                        type="email"
                        placeholder="Email"
                      />
                    </FormControl>
                    {form.formState.errors.email && (
                      <FormMessage>
                        {form.formState.errors.email.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        iconName={IconNames.LockSolid}
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                    {form.formState.errors.password && (
                      <FormMessage>
                        {form.formState.errors.password.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        iconName={IconNames.LockOutlined}
                        type="password"
                        placeholder="Confirm password"
                      />
                    </FormControl>
                    {form.formState.errors.confirmPassword && (
                      <FormMessage>
                        {form.formState.errors.confirmPassword.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="terms"
                        />
                        <Label htmlFor="terms">I agree to all terms</Label>
                      </div>
                    </FormControl>
                    {form.formState.errors.terms && (
                      <FormMessage>
                        {form.formState.errors.terms.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <div>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="default"
                  className="w-full"
                >
                  {isSubmitting && <Loader2 className="animate-spin" />}
                  Register
                </Button>
              </div>
            </form>
          </Form>

          <div>
            Already have an account? <Link text="Sign In" href={Route.SignIn} />
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default SignUpForm;
