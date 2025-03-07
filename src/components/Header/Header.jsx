import React from 'react';
import { styled, Box, useTheme, Typography } from "@mui/material";
import { Grid2 as Grid } from '@mui/material';

// Componente personalizado com ::before
const HeaderBefore = styled(Box)(({ theme }) => ({
  position: "relative", // O componente pai precisa ser relativo
  width: "100%",
  height: "100vh",
  backgroundImage: "url('https://wallpapercat.com/w/full/c/2/6/94419-3840x2160-desktop-4k-flash-dc-wallpaper.jpg')",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  overflow: 'none',
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.overlay.main, // Usa a cor do tema
    filter: "blur(5px)", // Desfoca o fundo
    zIndex: 1, // Fica acima da imagem, mas abaixo do conteúdo
    pointerEvents: "none", // Evita interferências de clique
  },
}));

const Header = () => {
  const theme = useTheme(); // Acessa o tema atual

  return (
    <HeaderBefore>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
      <Box
        sx={{
          position: "relative",
          zIndex: 2, // Garante que o conteúdo fique acima do ::before
          textAlign: "center",
          color: theme.palette.text.primary, // Usa a cor do texto do tema
          paddingTop: "20px",
        }}
      >
        <Grid container>
          <Grid item
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
          >
            <Typography variant="h1" sx={{
              fontFamily: 'Anton',
              background: 'linear-gradient(to left, #7e8bb6, white)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent',
              fontSize: 50
            }}>Wescley Andrade</Typography>
            <Typography>Especialista em tecnologias</Typography>
          </Grid>
          <Grid item
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box
              component="img"
              src="https://static.vecteezy.com/system/resources/thumbnails/026/497/734/small_2x/businessman-on-isolated-png.png"
              alt="Wescley Andrade"
              width={400}
              sx={{
                WebkitFilter: 'drop-shadow(5px 5px 5px white)',
                filter: 'drop-shadow(2px 2px 5px #cf3545)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          </Grid>
        </Grid>
        teste
      </Box>
    </HeaderBefore>
  );
};

export default Header;