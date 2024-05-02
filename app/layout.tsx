import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const baseUrl = new URL(
  process.env.NODE_ENV === 'development'
    ? (process.env.DEV_URL as string)
    : (process.env.PRODUCTION_URL as string),
);

// metadata
export const metadata: Metadata = {
  title: {
    template: '%s | My Link Zone',
    default: 'Your One Last link 🔗 | My Link Zone',
  },
  description:
    'Elevate your digital identity with Your one link. Unleash creativity, effortlessly share your story. Your connections, your canvas.',
  metadataBase: baseUrl,
  openGraph: {
    url: baseUrl,
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader height={5} color='#10b981' />
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
