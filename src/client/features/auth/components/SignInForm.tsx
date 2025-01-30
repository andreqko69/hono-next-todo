'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
import { Input } from '@/client/components/ui/input';
import { Label } from '@/client/components/ui/label';
import { Spinner } from '@/client/components/ui/spinner';
import { signIn } from '@/client/features/auth/api/mutations';
import FormContainer from '@/client/features/auth/components/FormContainer';
import { useToast } from '@/client/hooks/use-toast';
import ErrorHandler from '@/client/lib/ErrorHandler';
import {
  Route,
  SearchParamKey,
  StatusValue,
} from '@/shared/navigation/constants';
import { signInSchema } from '@/shared/validation/auth/schema';

type FormFields = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { trigger } = useSWRMutation('/api/v1/auth/login', signIn);

  useEffect(() => {
    const status = searchParams.get(SearchParamKey.Status);

    if (status === StatusValue.SignupSuccess) {
      toast({
        title: 'Sign up successful!',
        description: 'You can now login with your credentials.',
        variant: 'default',
      });
    }
  }, [searchParams, toast]);

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setIsSubmitting(true);

      await trigger(data);
    } catch (error: unknown) {
      ErrorHandler.handleFormError({ error, form, toast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <div className="flex w-full">
        <div className="flex flex-col w-full md:w-[50%] md:max-w-[450px] justify-center gap-4">
          <h2 className="text-4xl font-bold">Sign In</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Email" />
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
                name="rememberMe"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="remember-me"
                        />
                        <Label htmlFor="remember-me">Remember me</Label>
                      </div>
                    </FormControl>
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
                  {isSubmitting && <Spinner size="sm" />}
                  Login
                </Button>
              </div>
            </form>
          </Form>

          <div>
            Don&#39;t have an account?{' '}
            <Link text="Create one" href={Route.SignUp} />
          </div>
        </div>
        <div className="hidden md:flex md:w-auto">
          <Image
            className="w-full"
            src="/images/auth/sign-in.png"
            alt="Sign in"
            width={468}
            height={468}
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default SignInForm;
