import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'MovSeek',
  description: 'MovSeek - movies recommendation platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClerkProvider>
          <div>{children}</div>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
