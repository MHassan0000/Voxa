import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Voxa",
  description: "Professional Video Conferencing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#4f46e5',
              colorBackground: '#1a1a2e',
              colorInputBackground: '#131320',
              colorInputText: '#e4e4e7',
              colorText: '#e4e4e7',
              colorTextSecondary: '#6b7280',
              borderRadius: '0.75rem',
            },
            elements: {
              card: {
                backgroundColor: '#1a1a2e',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              },
              formButtonPrimary: {
                backgroundColor: '#4f46e5',
                '&:hover': {
                  backgroundColor: '#4338ca',
                },
              },
              footerActionLink: {
                color: '#6366f1',
              },
              headerTitle: {
                color: '#e4e4e7',
              },
              headerSubtitle: {
                color: '#6b7280',
              },
              socialButtonsBlockButton: {
                backgroundColor: '#131320',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                color: '#e4e4e7',
                '&:hover': {
                  backgroundColor: '#1e1e30',
                },
              },
              formFieldInput: {
                backgroundColor: '#131320',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#e4e4e7',
              },
              dividerLine: {
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
              },
              dividerText: {
                color: '#6b7280',
              },
              userButtonAvatarBox: {
                width: '36px',
                height: '36px',
              },
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
