import type { Metadata } from 'next';
import type { Viewport } from 'next';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import localFont from 'next/font/local';

import BottomNav from '@components/common/BottomNav';
import Providers from '@components/providers/TQProvider';

import './globals.css';

const pretendard = localFont({
  src: '/fonts/PretendardVariable.woff2',
  weight: '100 900',
  variable: '--font-pretendard',
  preload: true, // Next.js에서 preload 설정
  display: 'swap',
});

export const metadata: Metadata = {
  title: '모닥모닥',
  description: '사람들이 함께 모여 이야기를 나누고, 추억을 쌓는 공간',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function (m, a, z, e) {
                var s, t;
                try {
                  t = m.sessionStorage.getItem('maze-us');
                } catch (err) {}

                if (!t) {
                  t = new Date().getTime();
                  try {
                    m.sessionStorage.setItem('maze-us', t);
                  } catch (err) {}
                }

                s = a.createElement('script');
                s.src = z + '?apiKey=' + e;
                s.async = true;
                a.getElementsByTagName('head')[0].appendChild(s);
                m.mazeUniversalSnippetApiKey = e;
              })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '470e8e94-bbdc-45a7-b49f-afc50ef1c7e3');
            `,
          }}
        />
      </head>
      <body className={`${pretendard.className} antialiased`}>
        <Providers>
          {children}
          <BottomNav />
          <ReactQueryDevtools />
        </Providers>
      </body>
    </html>
  );
}
