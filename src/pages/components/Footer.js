import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SignatureDark from '../../assets/images/signature_dark.png';
import { useTheme } from '@mui/material';
import SignatureLight from '../../assets/images/signature_light.png';
import { YouTube } from '@mui/icons-material';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Typography color="text.secondary" component="span" variant='body2'>
        Wescley Andrade
      </Typography>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const theme = useTheme();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
              Já vai ? 😞
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
              Por favor, não me deixe... 😭
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
              Brincadeira 😅, foi um prazer te ver aqui, aaaa, agora que chegou até aqui,
              <Typography component="span" variant="h6"> Vamos fazer história </Typography> juntos ?
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ flexShrink: 0 }}
              href="http://wa.me/5519996447464"
              target="_blank"
            >
              <WhatsAppIcon />&nbsp;Entrar em contato
            </Button>       
          </Box>
          <img src={theme.palette.mode === 'light' ? SignatureLight : SignatureDark} width={300} />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Links
          </Typography>
          <Link sx={{ cursor: 'pointer' }} color="text.secondary" variant="body2" onClick={() => scrollToSection('inicio')}>
            Início
          </Link>
          <Link sx={{ cursor: 'pointer' }} color="text.secondary" variant="body2" onClick={() => scrollToSection('sobre')}>
            Sobre
          </Link>
          <Link sx={{ cursor: 'pointer' }} color="text.secondary" variant="body2" onClick={() => scrollToSection('historia')}>
            História
          </Link>
          <Link sx={{ cursor: 'pointer' }} color="text.secondary" variant="body2" onClick={() => scrollToSection('soft-skills')}>
            SoftSkills
          </Link>
          <Link sx={{ cursor: 'pointer' }} color="text.secondary" variant="body2" onClick={() => scrollToSection('videos')}>
            Vídeos
          </Link>
          <Link sx={{ cursor: 'pointer' }} color="text.secondary" variant="body2" onClick={() => scrollToSection('hard-skills')}>
            HardSkills
          </Link>
          <Link sx={{ cursor: 'pointer' }} color="text.secondary" variant="body2" onClick={() => scrollToSection('experiencia')}>
            Experiências
          </Link>
          <Link sx={{ cursor: 'pointer' }} color="text.secondary" variant="body2" onClick={() => scrollToSection('projetos')}>
            Projetos
          </Link>
          <Link sx={{ cursor: 'pointer' }} color="text.secondary" variant="body2" onClick={() => scrollToSection('ia')}>
            Inteligência artificial
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Profissional
          </Typography>
          <Link color="text.secondary" variant="body2" target="_blank" href="https://www.youtube.com/@WESCLEY-ANDRADE/videos">
            Youtube
          </Link>
          <Link color="text.secondary" variant="body2" target="_blank" href="https://github.com/wescleypa">
            Github
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            LinkedIn
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Social
          </Typography>
          <Link color="text.secondary" variant="body2" target="_blank" href="https://www.instagram.com/wescleypa.br/">
            Instagram
          </Link>
          <Link color="text.secondary" variant="body2" target="_blank" href="http://wa.me/5519996447464">
            WhatsApp
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Typography variant='body2' sx={{ maxWidth: 400, fontSize: 10 }}>
            Todo material e projeto disponível aqui é livre e aberto para fins de estudos, portanto declaro não ter nenhuma responsabilidade sobre má utilização dos mesmos.
          </Typography>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.secondary' }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://www.youtube.com/@WESCLEY-ANDRADE/videos"
            target="_blank"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <YouTube />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="#"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}