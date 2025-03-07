import React, { useState } from 'react';
import { Container, Grid2 as Grid, Card, CardMedia, CardContent, Typography, Modal, Box, Button, Collapse } from '@mui/material';
import Mariobot from '../../assets/images/gallery/mariobot.jpg';
import MarioFood from '../../assets/images/gallery/mariofood.jpg';
import Face from '../../assets/images/gallery/facebook.jpg';
import Social from '../../assets/images/gallery/social.jpg';
import Samp from '../../assets/images/gallery/samp.jpg';
import Gtav from '../../assets/images/gallery/gtav.jpg';
import Minecraft from '../../assets/images/gallery/minecraft.jpg';
import ML from '../../assets/images/gallery/mercadolivre.jpg';
import Cars from '../../assets/images/gallery/cars.jpg';
import CodeIcon from '@mui/icons-material/Code';
import ItemProject from './ItemProject';
import MB1 from '../../assets/images/gallery/mariobot/1.jpg';
import MB2 from '../../assets/images/gallery/mariobot/2.jpg';
import MB3 from '../../assets/images/gallery/mariobot/3.jpg';
import MB4 from '../../assets/images/gallery/mariobot/4.jpg';
import MB5 from '../../assets/images/gallery/mariobot/5.jpg';
import MF1 from '../../assets/images/gallery/mariofood/1.jpg';
import MF2 from '../../assets/images/gallery/mariofood/2.jpg';
import MF3 from '../../assets/images/gallery/mariofood/3.jpg';
import MF4 from '../../assets/images/gallery/mariofood/4.jpg';
import MF5 from '../../assets/images/gallery/mariofood/5.jpg';
import SC1 from '../../assets/images/gallery/social/1.jpg';
import SC2 from '../../assets/images/gallery/social/2.jpg';
import SC3 from '../../assets/images/gallery/social/3.jpg';
import SC4 from '../../assets/images/gallery/social/4.jpg';
import SC5 from '../../assets/images/gallery/social/5.jpg';
import SC6 from '../../assets/images/gallery/social/6.jpg';
import CA1 from '../../assets/images/gallery/cars/1.jpg';
import CA2 from '../../assets/images/gallery/cars/2.jpg';
import CA3 from '../../assets/images/gallery/cars/3.jpg';
import CA4 from '../../assets/images/gallery/cars/4.jpg';
import CA5 from '../../assets/images/gallery/cars/5.jpg';
import Facebook from './scripts/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

import Mercadolivre from './scripts/Mercadolivre/layout';

const projects = [
  {
    id: 1,
    title: '🤖 MárioBot',
    image: Mariobot,
    description: 'Um dos primeiros sistemas de autoatendimento digital, nessa época poucas pessoas forneciam o serviço, e era limitado à empresas de nome, pois só havia APIs oficiais da Meta.',
    sub: [
      {
        image: MB1,
        title: 'Validação inicial',
        description: 'Validação inicial com busca em DB baseado no CPF/CNPJ do cliente, com prosseguimento para início das respostas automáticas.'
      },
      {
        image: MB2,
        title: 'Atendimento humano',
        description: 'Coleta de informações para busca em DB com opção de atendimento humano.'
      },
      {
        image: MB3,
        title: 'Erro',
        description: 'Uma falha na coleta de dados iniciais, deixei disponível para verem que nem tudo são flores rsrs'
      },
      {
        image: MB4,
        title: 'Correção de palavras',
        description: 'Uma simples verificação de ortográfia com correção, rs.'
      },
      {
        image: MB5,
        title: 'Carrinho de compras',
        description: 'Carrinho de compras com opções variadas, desde cupom de descontos à finalização da compra.'
      },
      {
        image: MarioFood,
        title: 'MárioFood',
        description: 'Logo após o sucesso do iFood, desenvolvi um sistema ligado ao MárioBot para realizar pedidos via WhatsApp com controle via Dashboard e opcional integração ao iFood.',
        action: 'mariofood'
      },
    ]
  },
  {
    id: 2,
    title: '🍕 MárioFood',
    image: MarioFood,
    description: 'Logo após o sucesso do iFood, desenvolvi um sistema ligado ao MárioBot para realizar pedidos via WhatsApp com controle via Dashboard e opcional integração ao iFood.',
    sub: [
      {
        image: MF1,
        title: 'Plataforma',
        description: 'Plataforma para gerenciamento do iFood com atualização de status, contato com cliente, entre outras opções.',
      },
      {
        image: MF2,
        title: 'Configurações MárioBot',
        description: 'Configurações do atendimento automático utilizando MárioBot.',
      },
      {
        image: MF3,
        title: 'Carrinho de compras',
        description: 'Carrinho de compras com opção de finalização da compra.',
      },
      {
        image: MF4,
        title: 'Notificação de pedido',
        description: 'Notificação de novos pedidos com opções de aceitação e recusa pela loja, além de captação de dados primários.',
      },
      {
        image: MF5,
        title: 'Cupom de desconto',
        description: 'Captação de Cupom de desconto com aplicação utilizando DB e desconto automático no carrinho ou produto.',
      },
      {
        image: Mariobot,
        title: 'MárioBot',
        description: 'Logo após o sucesso do iFood, desenvolvi um sistema ligado ao MárioBot para realizar pedidos via WhatsApp com controle via Dashboard e opcional integração ao iFood.',
        action: 'mariobot'
      }
    ]
  },
  {
    id: 3,
    title: '📱 Redes sociais e chats',
    image: Social,
    description: 'Diversas redes sociais e chats desenvolvidos como passa-tempo.',
    sub: [
      {
        image: SC1,
        title: 'Sketchware',
        description: 'Codificação em Sketchware',
      },
      {
        image: SC2,
        title: 'Sketchware',
        description: 'Codificação Sketchware',
      },
      {
        image: SC3,
        title: 'Sketchware',
        description: 'Codificação Sketchware',
      },
      {
        image: SC4,
        title: 'Similiar Instagram',
        description: 'Rede social similar ao Instagram',
      },
      {
        image: SC5,
        title: 'Chat',
        description: 'Chat de batepapo similiar ao WhatsApp',
      },
      {
        image: SC6,
        title: 'Chat',
        description: 'Rede social semelhante ao WhatsApp com conversas e Status',
      }
    ]
  },
  {
    id: 4,
    title: '🕵️‍♂️ Coleta de informações Facebook',
    image: Face,
    description: 'Desenvolvido para coletar o máximo possível de informações públicas de usuários, desde o usuário de acesso da plataforma até membros de família e fotos.',
    sub: [],
    action: "facebook"
  },
  {
    id: 5,
    title: '🛒 Fake Mercado Livre',
    image: ML,
    description: 'Plataforma que utiliza de informações públicas do Mercado Livre para manipular usuários e coletar dados. Produtos reais, com preços acessíveis. Além disso, foi planejada para não deixar rastros, portanto, não faz autenticação.',
    sub: [],
    action: 'mercadolivre'
  },
  {
    id: 6,
    title: '🚗 Cars and People Monitor',
    image: Cars,
    description: 'IA em Python desenvolvida para alertar movimento de pessoas e veículos.',
    sub: [
      {
        image: CA1,
        title: 'Face detect',
        description: 'Detecção facial utilizando Python com OpenCV treinada por mim.'
      },
      {
        image: CA2,
        title: 'Bicicletas e objetos',
        description: 'Capaz de detectar pessoas em objetos como bicicletas e veículos.'
      },
      {
        image: CA3,
        title: 'Pessoas em movimento',
        description: 'Capaz de detectar pessoas em movimento.'
      },
      {
        image: CA4,
        title: 'Múltiplas detecções',
        description: 'Capaz de detectar múltiplas pessoas e objetos em movimento.'
      },
      {
        image: CA5,
        title: 'Console',
        description: 'Console para monitoramento de dados e informações.'
      },
    ]
  },
  {
    id: 7,
    title: '🎮 GTA SA:MP',
    image: Samp,
    description: 'Servidor desenvolvido em Pawn (C) para Grand Theft Auto San Andreas.',
    sub: [],
    video: 'https://www.youtube.com/watch?v=hil7qL6L-XI'
  },
  {
    id: 8,
    title: '🎮 GTA V FiveM',
    image: Gtav,
    description: 'Servidor desenvolvido em Lua e Javascript (Node) para Grand Theft Auto Five.',
    sub: [],
    video: 'https://www.youtube.com/watch?v=Xqp9bGeINtM'
  },
  {
    id: 9,
    title: '⛏️ Minecraft Server',
    image: Minecraft,
    description: 'Servidor desenvolvido com ajuda de Java e scripts para Minecraft (1.5/1.7).',
    sub: [],
    video: 'https://www.youtube.com/watch?v=kmjovdbPwQU'
  },
];

function Gallery() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [contentActive, setActiveContent] = useState(false);
  const [projectSelected, setSelectedProject] = useState();
  const [subSelected, setSubSelected] = useState();
  const [getDestaque, setDestaque] = useState(false);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false); // Fecha o menu móvel após clicar em um item
  };

  const renderContent = (project) => {
    if (project?.action) {
      if (project?.action === 'mercadolivre') {
        setDestaque(true);
      }
      setSubSelected(project?.action);
      setActiveContent(true);
    } else {
      setSelectedProject(project);
      setActiveContent(true);
    }
    scrollToSection('projetos');
  };

  return (
    <Box id="projetos" component="div" sx={{ mb: 8 }}>
      <Collapse in={contentActive && subSelected === 'facebook'}>
        <Facebook setActiveContent={setActiveContent} setSubSelected={setSubSelected} />
      </Collapse>
      <Collapse in={contentActive && subSelected === 'mercadolivre'}>
        <Mercadolivre
          getDestaque={getDestaque}
          setActiveContent={setActiveContent}
          setSubSelected={setSubSelected}
        />
      </Collapse>
      <Collapse in={contentActive && subSelected !== 'facebook'}>
        <ItemProject setActiveContent={setActiveContent} project={projectSelected} />
      </Collapse>
      <Collapse in={!contentActive && subSelected !== 'facebook'}>
        <Container sx={{ py: 4, mb: 5 }}>
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
                justifyContent: 'center'
              }}
              gutterBottom
            >
              <CodeIcon />&nbsp;
              Projetos
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Principais projetos desenvolvidos.
            </Typography>
          </Container>
          <Grid container spacing={4}>
            {projects.map((project) => (
              <Grid item key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.01)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    image={project.image}
                    alt={project.title}
                    sx={{
                      height: 200, // Altura fixa para o CardMedia
                      width: '100%', // Largura de 100% do contêiner
                      objectFit: 'cover', // Garante que a imagem cubra o espaço
                    }}
                    onClick={() => handleOpen(project.image)}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {project.title}
                    </Typography>
                    <Typography>
                      {project.description}<br />
                      {project?.video && (
                        <Button
                          sx={{
                            position: 'static',
                            mt: 1
                          }}
                          href={project.video}
                          target="_blank"
                          startIcon={<YouTubeIcon />}
                        >
                          Assistir vídeo
                        </Button>
                      )}
                      {!project?.action && !project?.video &&
                        (
                          <Button
                            sx={{
                              position: 'static',
                              mt: 1
                            }}
                            startIcon={<PhotoLibraryIcon />}
                            onClick={() => renderContent(project)}
                          >
                            Ver mais
                          </Button>
                        )}
                      {!!project?.action &&
                        (
                          <Button
                            sx={{
                              position: 'static',
                              mt: 1
                            }}
                            startIcon={<PlayCircleFilledWhiteIcon />}
                            onClick={() => renderContent(project)}
                          >
                            Testar agora
                          </Button>
                        )}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                outline: 'none',
              }}
            >
              <img src={selectedImage} alt="Imagem ampliada" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
            </Box>
          </Modal>
        </Container >
      </Collapse >

      {/* Botão "Ver mais projetos no meu Github" */}
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          href="https://github.com/wescleypa"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 4 }}
        >
          <GitHubIcon />&nbsp;
          Ver mais projetos no meu Github
        </Button>
      </Container>
    </Box>
  );
}

export default Gallery;