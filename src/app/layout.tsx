import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';
import Providers from '@/providers/ReactQueryPorivder';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'پنل مدیریت نظرات',
  description: 'سیستم مدیریت و بررسی نظرات کاربران',
  keywords: ['نظرات', 'مدیریت', 'پنل ادمین'],
  authors: [{ name: 'تیم توسعه' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
