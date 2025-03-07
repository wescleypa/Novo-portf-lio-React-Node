import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Link,
} from '@mui/material';

const Portfolio = () => {
  return (
    <div>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sou Wescley
          </Typography>
          <Link href="#sobre" color="inherit" underline="none" sx={{ mx: 2 }}>
            <Button color="inherit">Sobre</Button>
          </Link>
          <Link href="#projetos" color="inherit" underline="none" sx={{ mx: 2 }}>
            <Button color="inherit">Projetos</Button>
          </Link>
          <Link href="#contato" color="inherit" underline="none" sx={{ mx: 2 }}>
            <Button color="inherit">Contato</Button>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://via.placeholder.com/1500)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1">
          Bem-vindo ao meu portfólio!
        </Typography>
      </Box>

      {/* Sobre Mim */}
      <Container id="sobre" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sobre Mim
        </Typography>
        <Typography variant="body1">
          Olá! Eu sou Wescley, um desenvolvedor full-stack apaixonado por criar soluções digitais incríveis. Tenho experiência com React, Node.js, e outras tecnologias modernas.
        </Typography>
      </Container>

      {/* Projetos */}
      <Container id="projetos" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Projetos
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300"
                alt="Projeto 1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Projeto 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Descrição breve do projeto 1.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300"
                alt="Projeto 2"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Projeto 2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Descrição breve do projeto 2.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Adicionar mais projetos */}
        </Grid>
      </Container>

      {/* Habilidades */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Habilidades
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="body1">React</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body1">Node.js</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body1">JavaScript</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body1">TypeScript</Typography>
          </Grid>
          {/* Adicionar mais habilidades */}
        </Grid>
      </Container>

      {/* Contato */}
      <Container id="contato" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contato
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField fullWidth label="Nome" margin="normal" />
          <TextField fullWidth label="Email" margin="normal" />
          <TextField fullWidth label="Mensagem" margin="normal" multiline rows={4} />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Enviar
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Portfolio;