import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aceternity Macbook Scroll – Landing',
  description: 'Landing page with Aceternity UI Macbook Scroll component',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
