import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
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
      <body className={`${sora.className} ${sora.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#6c63ff',
              colorBackground: '#0a0a0f',
              colorInputBackground: '#0e0e14',
              colorInputText: '#e4e4e7',
              colorText: '#e4e4e7',
              colorTextSecondary: '#9ca3af',
              colorDanger: '#ef4444',
              borderRadius: '0.75rem',
            },
            elements: {
              rootBox: {
                width: '100%',
              },
              card: {
                backgroundColor: '#0a0a0f',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 0 80px rgba(108, 99, 255, 0.04), 0 25px 50px -12px rgba(0, 0, 0, 0.6)',
              },
              headerTitle: {
                color: '#f4f4f5',
                fontWeight: '600',
              },
              headerSubtitle: {
                color: '#9ca3af',
              },
              socialButtonsBlockButton: {
                backgroundColor: '#0e0e14',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                color: '#e4e4e7',
                '&:hover': {
                  backgroundColor: '#141420',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
              },
              socialButtonsBlockButtonText: {
                color: '#e4e4e7',
              },
              formFieldInput: {
                backgroundColor: '#0e0e14',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                color: '#e4e4e7',
                '&:focus': {
                  borderColor: 'rgba(108, 99, 255, 0.4)',
                  boxShadow: '0 0 0 3px rgba(108, 99, 255, 0.1)',
                },
              },
              formFieldLabel: {
                color: '#d4d4d8',
              },
              formButtonPrimary: {
                backgroundColor: '#6c63ff',
                fontWeight: '500',
                '&:hover': {
                  backgroundColor: '#5b52e0',
                },
              },
              footerAction: {
                '& a': {
                  color: '#6c63ff',
                },
              },
              footerActionLink: {
                color: '#6c63ff',
              },
              dividerLine: {
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
              },
              dividerText: {
                color: '#9ca3af',
              },
              identityPreview: {
                backgroundColor: '#0e0e14',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              },
              identityPreviewText: {
                color: '#e4e4e7',
              },
              identityPreviewEditButton: {
                color: '#6c63ff',
              },
              formFieldAction: {
                color: '#6c63ff',
              },
              otpCodeFieldInput: {
                backgroundColor: '#0e0e14',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                color: '#e4e4e7',
              },
              userButtonAvatarBox: {
                width: '34px',
                height: '34px',
              },
              userButtonPopoverCard: {
                backgroundColor: '#0a0a0f',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              },
              userButtonPopoverActionButton: {
                '&:hover': {
                  backgroundColor: '#0e0e14',
                },
              },
              userButtonPopoverActionButtonText: {
                color: '#e4e4e7',
              },
              userButtonPopoverActionButtonIcon: {
                color: '#9ca3af',
              },
              userButtonPopoverFooter: {
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
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
