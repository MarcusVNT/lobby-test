import { Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Stack>
      <Typography
        variant="h1"
        sx={{
          color: "primary.main",
        }}
      >
        Bem Vindo!
      </Typography>
    </Stack>
  );
}
