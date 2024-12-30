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

const formSchema = z
  .object({
    firstName: z
      .string()
      .nonempty({ message: 'First name must be at least 1 character' }),
    lastName: z
      .string()
      .nonempty({ message: 'Last name must be at least 1 character' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((value) => value, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('data:', data);
  };

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
                      <Input {...field} placeholder="First name" />
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
                      <Input {...field} placeholder="Last name" />
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
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
                <Button type="submit" variant="default" className="w-full">
                  Register
                </Button>
              </div>
            </form>
          </Form>

          <div>
            Already have an account?{' '}
            <Link text="Sign In" href={Routes.SignIn} />
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default SignUpForm;
