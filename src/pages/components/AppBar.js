import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/Menu'; // Ícone de menu para mobile
import logo from '../../assets/images/logo_wescley.png';
import logoLight from '../../assets/images/logo_wescley_light.png';
import { Chip } from '@mui/material';

// Estilo personalizado para o Toolbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.1),
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  boxShadow: theme.shadows[2],
  padding: '8px 16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.default, 0.9),
    boxShadow: theme.shadows[4],
  },
}));

// Estilo para os botões de navegação
const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  // Função para rolar até uma seção pelo ID
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false); // Fecha o menu móvel após clicar em um item
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 16px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          {/* Logo */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <img
              src={theme.palette.mode === 'light' ? logoLight : logo}
              width="150px"
              style={{ marginRight: 'auto', cursor: 'pointer' }}
              alt="Logo"
              onClick={() => scrollToSection('inicio')}
            />
          </Box>

          {/* Links de navegação (desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <NavButton onClick={() => scrollToSection('inicio')}>Início</NavButton>
            <NavButton onClick={() => scrollToSection('sobre')}>Sobre</NavButton>
            <NavButton onClick={() => scrollToSection('historia')}>História</NavButton>
            <NavButton onClick={() => scrollToSection('soft-skills')}>SoftSkills</NavButton>
            <NavButton onClick={() => scrollToSection('videos')}>Vídeos</NavButton>
            <NavButton onClick={() => scrollToSection('hard-skills')}>HardSkills</NavButton>
            <NavButton onClick={() => scrollToSection('experiencia')}>Experiência</NavButton>
            <NavButton onClick={() => scrollToSection('projetos')}>Projetos</NavButton>
            <NavButton onClick={() => scrollToSection('ia')}>Inteligência Artificial</NavButton>
            <Chip label="Beta" size="small" sx={{ fontSize: 12, fontWeight: 700, width: 50, color: 'white' }} color="warning" />
          </Box>

          {/* Botão de menu mobile */}
          <Box sx={{ display: { xs: 'flex', alignItems: 'center', md: 'none' } }}>
            <Chip label="Beta" size="small" sx={{ fontSize: 12, fontWeight: 700, width: 50, color: 'white', mr: 7 }} color="warning" />
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Menu móvel (Drawer) */}
          <Drawer
            anchor="top"
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                top: 'var(--template-frame-height, 0px)',
                backgroundColor: theme.palette.background.default,
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </Box>

              <MenuItem onClick={() => scrollToSection('inicio')}>Início</MenuItem>
              <MenuItem onClick={() => scrollToSection('sobre')}>Sobre</MenuItem>
              <MenuItem onClick={() => scrollToSection('historia')}>História</MenuItem>
              <MenuItem onClick={() => scrollToSection('soft-skills')}>SoftSkills</MenuItem>
              <MenuItem onClick={() => scrollToSection('videos')}>Vídeos</MenuItem>
              <MenuItem onClick={() => scrollToSection('hard-skills')}>HardSkills</MenuItem>
              <MenuItem onClick={() => scrollToSection('experiencia')}>Experiência</MenuItem>
              <MenuItem onClick={() => scrollToSection('projetos')}>Projetos</MenuItem>
              <MenuItem onClick={() => scrollToSection('ia')}>Inteligência Artificial</MenuItem>

              <Divider sx={{ my: 2 }} />
            </Box>
          </Drawer>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}