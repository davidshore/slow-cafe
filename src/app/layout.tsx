import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Slow Café",
  description: "Kaffe, fika och lunch på Södermalm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>
        <header className="site-header">
          <a className="brand" href="#top">
            Slow Café
          </a>
          <nav aria-label="Huvudmeny">
            <a href="#menu">Meny</a>
            <a href="#visit">Besök oss</a>
          </nav>
        </header>
        <div id="top">{children}</div>
        <footer className="site-footer" id="visit">
          <strong>Slow Café</strong>
          <span>Skånegatan 42 · Stockholm</span>
          <span>Hej@slowcafe.example</span>
        </footer>
      </body>
    </html>
  );
}

