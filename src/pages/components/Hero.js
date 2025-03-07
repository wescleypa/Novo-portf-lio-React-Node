import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ChatBox from './Chatbox';

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsl(210,22%,60.78%, 0.4)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsl(210,22%,60.78%, 0.8)',
  backgroundImage: `url(${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 500,
    width: '60%'
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsl(345.67,52.76%,16%, 0.2)',
    backgroundImage: `url(${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));


export default function Hero() {
  const [isIAOpen, setIsIAOpen] = React.useState(false);

  return (
    <Box
      id="inicio"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 20%, 0.4), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(345.67,52.76%,16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                color: 'primary.main',
                textAlign: 'center',
                ...theme.applyStyles('dark', {
                  color: 'text.primary',
                }),
              })}
            >
              Wescley Andrade
            </Typography>
          </Typography>
          <Typography
            sx={(theme) => ({
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
              ...theme.applyStyles('dark', {
                color: 'primary.light',
              }),
            })}
            variant="h6"
          >
            Expert em Análise e Desenvolvimento de Sistemas e novas tecnologias.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Melhor que ler, pergunte à IA.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ width: { xs: '100%', sm: '350px' } }}
          >
            <TextField
              id="email-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Chat com IA"
              placeholder="Pergunte à IA"
              value="Quem é Wescley ?"
              fullWidth
              slotProps={{
                htmlInput: {
                  autoComplete: 'off',
                  'aria-label': 'Chat com IA',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: 'fit-content' }}
              onClick={() => setIsIAOpen(true)}
            >
              Perguntar para IA
            </Button>
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            Chat gerenciado por&nbsp;
            <Link target="_blank" href="https://www.deepseek.com/" color="primary">
              Deepseek
            </Link>
            .
          </Typography>
        </Stack>
        <StyledBox id="image">
          <iframe style={{ borderRadius: 10 }} width="100%" height="100%" src="https://www.youtube.com/embed/bvNSTWmPX6A?si=--yaX3RLmxvHTche" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </StyledBox>
      </Container>

      <SwipeableDrawer
        anchor="bottom" // Define a posição do drawer (bottom, top, left, right)
        open={isIAOpen} // Controla se o drawer está aberto ou fechado
        onClose={() => setIsIAOpen(false)} // Fecha o drawer
        onOpen={() => setIsIAOpen(true)} // Abre o drawer
      >
        <Box
          sx={{
            width: '100%',
            height: '80vh', // Altura do drawer
            padding: 2,
            backgroundColor: 'background.paper', // Cor de fundo
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Inteligência artificial
          </Typography>
          <Typography>
            <ChatBox isFixed={true} />
          </Typography>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}