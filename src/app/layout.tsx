import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import './globals.css';
import { AppStoreProvider } from '@/lib/store';
import { I18nProvider } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EDE Employee Self Service & Manpower Outsourcing Management Platform',
  description: 'Enterprise HRMS portal for the Emirates Drug Establishment (مؤسسة الإمارات للدواء)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable}`}>
      <body className="min-h-screen flex flex-col text-[#0F172A] antialiased selection:bg-[#00B3AA]/20 selection:text-[#0F2342]">
        <AppStoreProvider>
          <I18nProvider>
            <div className="flex-1 flex flex-col">{children}</div>
          </I18nProvider>
        </AppStoreProvider>
      </body>
    </html>
  );
}
