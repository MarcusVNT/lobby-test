import type { Metadata } from 'next'
import LayoutClient from './layout.client'
import { Container, Stack } from '@mui/material'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'Lobby Test',
  description: 'Frontend developer test.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body>
        <LayoutClient>
          <Container
            sx={{
              padding: 0,
            }}
          >
            <Stack maxWidth={1200}>{children}</Stack>
          </Container>
        </LayoutClient>
      </body>
    </html>
  )
}
