import Link from "next/link";
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/character">Characters</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
