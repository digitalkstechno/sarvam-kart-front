import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Global styles

import Toast from "@/components/Toast";

import { Toaster } from "sonner";
import ReduxProvider from "@/store/ReduxProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Sarvam Cart | Premium Curated E-commerce",
  description:
    "Sarvam Cart is a premium curated e-commerce experience showcasing beautiful lifestyle, home decor, and fashion drops with seamless state tracking.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        suppressHydrationWarning
        className="font-sans antialiased  text-[#141d23] min-h-screen"
      >
          <ReduxProvider>
            <Toaster position="top-right" richColors />
            <Toast />
            {children}

            {/* Floating WhatsApp Button */}
            <div className="fixed bottom-6 right-6 z-50">
              <a
                href="https://wa.me/919979986362"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="relative block"
              >
                <span
                  className="social-ring hidden md:block"
                  style={{ backgroundColor: "#25D366" }}
                />
                <span
                  className="social-ring-2 hidden md:block"
                  style={{ backgroundColor: "#25D366" }}
                />

                <div
                  className="social-btn relative flex items-center justify-center w-8 h-8 md:w-11 md:h-11 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.486a.5.5 0 00.609.61l5.701-1.493A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 01-5.031-1.371l-.36-.214-3.733.978.997-3.645-.235-.374A9.862 9.862 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1c5.466 0 9.9 4.434 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z" />
                  </svg>
                </div>
              </a>
            </div>
          </ReduxProvider>
      </body>
    </html>
  );
}
