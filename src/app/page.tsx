import { redirect } from 'next/navigation';

import { Route } from '@/shared/navigation/constants';

export default function Home() {
  redirect(Route.Dashboard);
}
