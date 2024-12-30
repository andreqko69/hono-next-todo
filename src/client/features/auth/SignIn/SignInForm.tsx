'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
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
import FormContainer from '@/client/features/auth/components/FormContainer/FormContainer';
import { Routes } from '@/common/navigation/constants';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  rememberMe: z.boolean(),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('data:', data);
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
                  Register
                </Button>
              </div>
            </form>
          </Form>

          <div>
            Don&#39;t have an account?{' '}
            <Link text="Create one" href={Routes.SignUp} />
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
