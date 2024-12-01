'use client'

import { Button, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Logo from '/public/images/logo.svg'
import Vector from '/public/images/vector.svg'
import Point from '/public/images/point.svg'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <Stack
        alignItems="center"
        justifyContent="center"
        borderRadius={'24px'}
        bgcolor="#fff"
        padding="126px 0 0 0"
        textAlign="center"
        maxWidth="1024px"
        width="100%"
      >
        <Grid container>
          <Grid size={12} marginBottom="48px">
            <Logo width={189} height={54} />
          </Grid>
          <Grid size={12}>
            <Stack
              gap="20px"
              textAlign="center"
              maxWidth="436px"
              mx="auto"
              marginBottom="40px"
            >
              <Typography variant="h1" fontSize="2.5rem">
                Bem vindo!
              </Typography>
              <Typography color="primary.light" fontSize="1.125rem">
                Estamos muito felizes em ter você em nossa equipe! Preencha as
                perguntinhas a seguir para escolher o seu presente! 🎁
              </Typography>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/formulario-de-resgate')}
            >
              Começar
            </Button>
          </Grid>
        </Grid>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap="8px"
          marginTop="88px"
          marginBottom="20px"
        >
          <Vector />
          <Point width="2px" />
          <Typography fontWeight="600" fontSize=".875rem">
            2024
          </Typography>
          <Typography fontWeight="600" fontSize=".875rem">
            Lobby.tech{' '}
            <Typography component="span" fontSize=".875rem">
              em parceria com a
            </Typography>{' '}
            Lobby
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
