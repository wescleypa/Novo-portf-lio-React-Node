import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme/theme';
import AppAppBar from './components/AppBar';
import Hero from './components/Hero';
import HardSkills from './components/HardSkills';
import Experience from './components/Experience';
import SoftSkills from './components/SoftSkills';
import Youtube from './components/Youtube';
import Footer from './components/Footer';
import About from './components/About';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import ChatBox from './components/Chatbox';
import { Container, Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Fab } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const PersonalizedChat = () => {
  return (
    <Box sx={{ bgcolor: 'grey.900', pt: 4, pb: 6, borderRadius: '20px 20px 0 0' }} id="ia">
      <Container
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4
        }}
      >
        <Typography component="h2" variant="h4"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.light'
          }}
          gutterBottom
        >
          <AutoAwesomeIcon />&nbsp;
          Inteligência artificial
        </Typography>
        <Typography variant="body1" sx={{ color: 'grey.400' }}>
          Melhor que ler, pergunte à IA.
        </Typography>
      </Container>

      <Container
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ChatBox isFixed={false} />
      </Container>
    </Box>
  );
};

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Fab color={isDarkMode ? 'light' : 'secondary'} aria-label="change theme" sx={{ position: 'fixed', right: 16, bottom: 16 }} onClick={() => setIsDarkMode(!isDarkMode)}>
        {!isDarkMode ? (<DarkModeIcon />) : (<Brightness4Icon />)}
      </Fab>
      <Fab
        color={isDarkMode ? 'light' : 'secondary'}
        aria-label="Download Currículo"
        sx={{ position: 'fixed', right: 16, bottom: 80, display: 'flex', flexDirection: 'column' }}
        href="/curriculo.pdf"
        target="_blank"
      >
        <Box component="div">
          <FileDownloadIcon />
        </Box>
        <Box component="div">
          <Typography variant="body2" sx={{fontSize: 6}}>
            Baixar CV
          </Typography>
        </Box>
      </Fab>

      <CssBaseline />
      <AppAppBar />
      <Hero />
      <div>
        <About />
        <Timeline />
        <Divider />
        <SoftSkills />
        <Divider />
        <Youtube />
        <HardSkills />
        <Divider />
        <Experience />
        <Divider />
        <Gallery />
        <PersonalizedChat />
        <Divider />
        <Footer />
      </div>
    </ThemeProvider>
  );
}