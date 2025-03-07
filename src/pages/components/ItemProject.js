import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Breadcrumbs,
  Modal,
  Box,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

const ProjectDetails = ({ setActiveContent, project }) => {
  // Estado para controlar o modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Função para abrir o modal com a imagem selecionada
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage('');
  };

  const projectData = {
    title: project?.title ?? '',
    description: project?.description ?? '',
    sub: project?.sub ?? [],
  };

  const backPage = () => {
    setActiveContent(false);
  };

  const renderFood = () => {
    alert('ajustar');
  };

  const renderBot = () => {
    alert('ajustar');
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* Breadcrumbs para navegação *}
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => backPage()}
          >
            <ArrowBackIcon />&nbsp;
            Início
          </Link>
          <Typography sx={{ color: 'text.primary' }}>Projeto MárioFood</Typography>
        </Breadcrumbs>
      </div>*/}

      {/* Título do Projeto */}
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        {projectData.title}
      </Typography>

      {/* Descrição do Projeto */}
      <Typography variant="body1" align="center">
        {projectData.description}
      </Typography>

      {/* Cards com Funcionalidades */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {projectData.sub.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* CardMedia com onClick para abrir o modal */}
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{ height: 200, objectFit: 'cover', cursor: 'pointer' }}
                onClick={() =>
                  item?.action && item?.action === 'mariofood' ? renderFood()
                    : (item?.action && item?.action === 'mariobot' ? renderBot() : handleImageClick(item.image))
                }
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para exibir a imagem em tamanho maior */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            outline: 'none',
          }}
        >
          {/* Botão para fechar o modal */}
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>

          {/* Imagem no modal */}
          <img
            src={selectedImage}
            alt="Imagem em tamanho maior"
            style={{ maxWidth: '90vw', maxHeight: '90vh', display: 'block' }}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default ProjectDetails;