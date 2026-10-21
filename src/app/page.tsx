import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect root to login as the primary entry point
  redirect('/login');
}
