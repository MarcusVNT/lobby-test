'use client'

import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useRouter } from 'next/navigation'

export default function Form() {
  const router = useRouter()
  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <Stack
        borderRadius={'24px'}
        bgcolor="#fff"
        padding="40px 64px"
        maxWidth="1024px"
        width="100%"
      >
        <Typography fontSize="1.25rem" textAlign="center" fontWeight="600">
          Finalize seu resgate! 🚚
        </Typography>

        <Grid container marginTop="40px" spacing={2}>
          <Grid size={12}>
            <Typography variant="h2" fontWeight="600">
              Dados do destinatário
            </Typography>
          </Grid>
          <Grid size={12}>
            <TextField label="Nome completo*" variant="standard" fullWidth />
          </Grid>
          <Grid size={6}>
            <TextField label="CPF ou CNPJ*" variant="standard" fullWidth />
          </Grid>
          <Grid size={6}>
            <TextField label="E-mail*" variant="standard" fullWidth />
          </Grid>
        </Grid>

        <Grid container marginTop="40px" spacing={2}>
          <Grid size={12}>
            <Typography variant="h2" fontWeight="600">
              Endereço de entrega
            </Typography>
          </Grid>
          <Grid size={6}>
            <TextField label="CEP*" variant="standard" fullWidth />
          </Grid>
          <Grid size={6}>
            <TextField label="Rua*" variant="standard" fullWidth />
          </Grid>
          <Grid size={3}>
            <TextField label="Número*" variant="standard" fullWidth />
          </Grid>
          <Grid size={3}>
            <TextField label="Complemento*" variant="standard" fullWidth />
          </Grid>
          <Grid size={6}>
            <TextField label="Bairro*" variant="standard" fullWidth />
          </Grid>
          <Grid size={6}>
            <TextField label="Cidade*" variant="standard" fullWidth />
          </Grid>
          <Grid size={3}>
            <TextField label="Estado*" variant="standard" select fullWidth>
              <MenuItem value="SP">São Paulo</MenuItem>
              <MenuItem value="RJ">Rio de Janeiro</MenuItem>
              <MenuItem value="MG">Minas Gerais</MenuItem>
            </TextField>
          </Grid>
          <Grid size={3}>
            <TextField label="País*" variant="standard" select fullWidth>
              <MenuItem value="BR">Brasil</MenuItem>
              <MenuItem value="AR">Argentina</MenuItem>
              <MenuItem value="URU">Uruguay</MenuItem>
              <MenuItem value="CL">Chile</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid container marginTop="40px" spacing={2}>
          <Grid size={12}>
            <Typography variant="h2" fontWeight="600">
              Tamanhos
            </Typography>
          </Grid>
          <Grid size={6}>
            <TextField
              label="Qual seu tamanho de agasalho?*"
              variant="standard"
              select
              fullWidth
            >
              <MenuItem value="P">P</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="G">G</MenuItem>
              <MenuItem value="GG">GG</MenuItem>
              <MenuItem value="GG1">GG1</MenuItem>
              <MenuItem value="GG2">GG2</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid container marginTop="40px" spacing={2}>
          <Grid size={12}>
            <Typography variant="h2" fontWeight="600">
              Perguntas extras
            </Typography>
          </Grid>
          <Grid size={6}>
            <TextField label="Qual seu hobbie?*" variant="standard" fullWidth />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Você é do time comercial?*"
              variant="standard"
              fullWidth
            />
          </Grid>
        </Grid>

        <Stack
          flexDirection="row"
          justifyContent="space-between"
          marginTop="40px"
        >
          <Button color="primary" variant="outlined">
            Voltar
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push('/presente-resgatado')}
          >
            Concluir
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
