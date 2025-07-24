import '../styles/globals.css';
import strings from '../utils/strings';
import { SidebarProvider } from '../contexts/SidebarContext'; // path sesuai struktur project
import QueryProvider from '@/utils/QueryProvider';
// import authTokenHelper from '../helpers/authTokenHelper';
// import Titlebar from '@/components/Titlebar';
import TitlebarWrapper from '@/components/TitlebarWrapper';

export const metadata = {
  title: strings.appName,
  description: strings.appDescription,
  icons: {
    icon: '/favicon.ico', // Pastikan path sesuai
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>

      <SidebarProvider>
        <body className="font-sans bg-gray-100">
          <div id="root" className="h-screen w-screen overflow-hidden">
            <QueryProvider>
              {/* <Titlebar /> */}
              <TitlebarWrapper />
              {children}
            </QueryProvider>
          </div>
          <div id="tooltip-root"></div>
        </body>
      </SidebarProvider>
    </html>
  );
}
