import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';

const youtubeVideos = [
  {
    avatar: <Avatar alt="Wescley Andrade" src="https://yt3.googleusercontent.com/2p9cKAme7iBxBxHkLNokGnzE7aRLE6XpPUHKXh2p7dYhCMKf6NZmOLuS4XB9nUd8FtRfcvrV=s160-c-k-c0x00ffffff-no-rj" />,
    title: 'VPC na Amazon AWS EC2',
    author: 'Wescley Andrade',
    url: 'https://www.youtube.com/embed/f77IhyXX5D8',
    description: `
      <p>Neste vídeo, demonstro o processo de criação de uma <strong>Virtual Private Cloud (VPC)</strong> na <strong>Amazon Web Services (AWS)</strong> utilizando a instância <strong>EC2</strong>. A VPC é essencial para isolar redes dentro da AWS e permitir a comunicação segura entre os recursos.</p>
      <p>Neste projeto, fui responsável por configurar a VPC, sub-redes e rotas, garantindo a segurança e a conectividade dos servidores.</p>
      <h4>Tecnologias Utilizadas:</h4>
      <ul>
        <li><strong>Amazon Web Services (AWS):</strong> EC2, VPC, Sub-redes.</li>
        <li><strong>Segurança:</strong> Configuração de grupos de segurança.</li>
        <li><strong>Networking:</strong> Sub-redes públicas e privadas, tabelas de rotas.</li>
      </ul>
    `,
  },
  {
    avatar: <Avatar alt="Wescley Andrade" src="https://yt3.googleusercontent.com/2p9cKAme7iBxBxHkLNokGnzE7aRLE6XpPUHKXh2p7dYhCMKf6NZmOLuS4XB9nUd8FtRfcvrV=s160-c-k-c0x00ffffff-no-rj" />,
    title: 'Chatbot para WhatsApp',
    author: 'Wescley Andrade',
    url: 'https://www.youtube.com/embed/m7mNbRpHUdM?si=96jZZl8qXzeFWnZm',
    description: `
      <p>Neste vídeo, demonstro o processo de criação de um chatbot para WhatsApp utilizando a biblioteca <strong>WPPConnect</strong>. A biblioteca permite integração de sistemas com o WhatsApp de forma simples e prática, proporcionando automação em conversas e respostas dentro da plataforma. Fui responsável pela configuração do ambiente, integração com WhatsApp e personalização das interações do bot.</p>
      <h4>Tecnologias Utilizadas:</h4>
      <ul>
        <li><strong>Biblioteca WPPConnect</strong>.</li>
        <li><strong>Plataforma WhatsApp</strong>.</li>
        <li><strong>Linguagens NodeJs</strong>.</li>
      </ul>
    `,
  },
  {
    avatar: <Avatar alt="Wescley Andrade" src="https://yt3.googleusercontent.com/2p9cKAme7iBxBxHkLNokGnzE7aRLE6XpPUHKXh2p7dYhCMKf6NZmOLuS4XB9nUd8FtRfcvrV=s160-c-k-c0x00ffffff-no-rj" />,
    title: 'Estrutura para criar uma Fintech de graça',
    author: 'Wescley Andrade',
    url: 'https://www.youtube.com/embed/bvNSTWmPX6A?si=JkXlhbi6tTB7WpZj',
    description: `
      <p>Neste vídeo, compartilho o processo para criar a estrutura de uma <strong>Fintech</strong> de forma gratuita, utilizando plataformas e ferramentas acessíveis. A ideia é demonstrar como é possível montar uma solução financeira completa, com funcionalidades como pagamentos, transferências e gestão de dados, sem precisar de grandes investimentos. Fui responsável pela escolha das ferramentas, integração das APIs e montagem da estrutura da aplicação.</p>
      <h4>Tecnologias Utilizadas:</h4>
      <ul>
        <li><strong>Plataformas Front-end:</strong> Mercadopago.</li>
        <li><strong>APIs e Bibliotecas:</strong> Checkout transparente Mercadopago, WPPConnect e Puppeteer com chromium.</li>
        <li><strong>Linguagens e Frameworks:</strong> NodeJs e Angular.</li>
      </ul>
    `,
  }
];

export default function YoutubeVideos() {
  return (
    <Container
      id="videos"
      sx={{
        pt: 4,
        pb: 8,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <YouTubeIcon />&nbsp;
          Vídeos no YouTube
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Além de ler, você pode assistir.
        </Typography>
      </Box>

      <Grid container spacing={2} width="100%">
        {youtubeVideos.map((video, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <iframe
                  width="100%"
                  height="270"
                  src={video.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ borderRadius: 10 }}
                />
                <div dangerouslySetInnerHTML={{ __html: video.description }} />
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader
                  avatar={video.avatar}
                  title={video.title}
                  subheader={video.author}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Botão "Ver mais conteúdos no meu canal" */}
      <Button
        variant="contained"
        color="error"
        href="https://www.youtube.com/@WESCLEY-ANDRADE"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ mt: 4 }}
      >
        <YouTubeIcon />&nbsp;
        Ver mais conteúdos no meu canal
      </Button>
    </Container>
  );
}