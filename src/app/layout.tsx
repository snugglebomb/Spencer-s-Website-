import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TopNav from './components/TopNav';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spencer Hibbert | Cybersecurity Professional',
  description: 'Cybersecurity major at George Mason University pursuing a career in cybersecurity and tech. Passionate about computer systems and technology.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-neutral-950 text-gray-100`}>
        <TopNav />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
