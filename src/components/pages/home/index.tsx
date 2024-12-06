'use client'

import { Button, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Logo from '/public/images/logo.svg'
import Vector from '/public/images/vector.svg'
import Point from '/public/images/point.svg'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getRedeemPageDetails } from '@/api/redeem-gift/redeem-gift'
import { Slide, toast } from 'react-toastify'

export default function Home() {
  const router = useRouter()
  const paramsID = '5c7e9bc8-e063-4d86-8e2c-eccce6f3ee1c'

  const { data } = useQuery({
    queryKey: ['redeemPage', paramsID],
    queryFn: () => getRedeemPageDetails(paramsID),
  })

  if (data?.status === 'INACTIVE') {
    toast.error('Página de resgate não encontrada.'),
      {
        position: 'bottom-right',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      }
  }

  const handleClick = () => {
    router.push(`/formulario-de-resgate/${paramsID}`)
  }
  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <Stack
        alignItems="center"
        justifyContent="center"
        borderRadius={'24px'}
        bgcolor="#fff"
        padding={{ xs: '126px 20px 0 20px', sm: '126px 0 0 0' }}
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
              <Typography
                variant="h1"
                component="h1"
                fontSize={{ xs: '1.625rem', md: '2.5rem' }}
              >
                {data?.title}
              </Typography>
              <Typography
                color="primary.light"
                fontSize={{ xs: '1rem', md: '1.125rem' }}
              >
                Estamos muito felizes em ter você em nossa equipe! Preencha as
                perguntinhas a seguir para escolher o seu presente! 🎁
              </Typography>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Button variant="contained" color="primary" onClick={handleClick}>
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
