'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
import FormContainer from '@/client/features/auth/components/FormContainer';
import { useToast } from '@/client/hooks/use-toast';
import {
  Route,
  SearchParamKey,
  StatusValue,
} from '@/shared/navigation/constants';
import { signInSchema } from '@/shared/validation/auth/schema';

const SignInForm = () => {
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

  useEffect(() => {
    const status = searchParams.get(SearchParamKey.Status);

    if (status === StatusValue.SignupSuccess) {
      console.log('Toast');
      toast({
        title: 'Signup successful!',
        description: 'You can now login with your credentials.',
        variant: 'default',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    console.log('data:', data);
    fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, password: '123' }),
    });
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
                <Button type="submit" variant="default" className="w-full">
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
        <div className="hidden md:flex md:w-[50%]">
          <Image
            className="w-full"
            src="/images/auth/sign-in.png"
            alt="Sign in"
            width={433}
            height={652}
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default SignInForm;