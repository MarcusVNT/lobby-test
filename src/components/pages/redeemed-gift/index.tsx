'use client'

import { Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Logo from '/public/images/logo.svg'
import Vector from '/public/images/vector.svg'
import Point from '/public/images/point.svg'

export default function RedeemedGift() {
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
              maxWidth="500px"
              mx="auto"
              marginBottom="40px"
            >
              <Typography variant="h1" fontSize="2.5rem">
                Presente resgatado!🎉🥳
              </Typography>
              <Stack>
                <Typography color="primary.light" fontSize="1.125rem">
                  Seu pedido está em andamento!
                </Typography>{' '}
                <Typography color="primary.light" fontSize="1.125rem">
                  E não se preocupe, as alterações de status do envio chegam
                  todas em seu e-mail!
                </Typography>
              </Stack>
            </Stack>
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
