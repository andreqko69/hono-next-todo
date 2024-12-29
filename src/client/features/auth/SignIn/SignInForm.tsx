import Image from 'next/image';
import React from 'react';

import Link from '@/client/components/Link/Link';
import { Button } from '@/client/components/ui/button';
import { Checkbox } from '@/client/components/ui/checkbox';
import { Input } from '@/client/components/ui/input';
import { Label } from '@/client/components/ui/label';
import FormContainer from '@/client/features/auth/components/FormContainer/FormContainer';
import { Routes } from '@/common/navigation/constants';

const SignInForm = () => {
  return (
    <FormContainer>
      <div className="flex w-full">
        <div className="flex flex-col w-full md:w-[50%] md:max-w-[450px] justify-center gap-4">
          <h2 className="text-4xl font-bold">Sign In</h2>
          <form className="flex flex-col gap-3">
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" />
              <Label htmlFor="remember-me">Remember me</Label>
            </div>

            <Button variant="default">Login</Button>
          </form>
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
