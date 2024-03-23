import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          sans.className,
          'flex flex-col min-h-screen antialiased text-foreground bg-background',
        )}
      >
        {children}
      </body>
    </html>
  );
}
