import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Divider,
  IconButton,
  Modal,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const Profile = ({ profileData, setShowProfile }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Estado para controlar a foto selecionada
  const [openModal, setOpenModal] = useState(false); // Estado para controlar a abertura do modal

  if (!profileData) return null;

  const { profilePic, basic, family, person, photos } = profileData;

  // Função para abrir o modal com a foto selecionada
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setOpenModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPhoto(null);
  };

  return (
    <Box sx={{ mt: 4, width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Card>
        <CardContent>
          {/* Botão de voltar */}
          <IconButton aria-label="back" sx={{ fontSize: 15, mb: 4 }} onClick={() => setShowProfile(false)}>
            <ArrowBack />&nbsp;Voltar
          </IconButton>

          {/* Cabeçalho com foto e informações básicas */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 4 }}>
            <Avatar
              src={profilePic}
              alt="Foto de perfil"
              sx={{ width: 120, height: 120 }}
            />
            <Box>
              <Typography variant="h5" gutterBottom>
                Informações Básicas
              </Typography>
              <Typography variant="body1">
                <strong>Gênero:</strong> {basic?.genre || 'Não informado'}
              </Typography>
              <Typography variant="body1">
                <strong>Data de Nascimento:</strong> {basic?.birthday || 'Não informado'}
              </Typography>
              <Typography variant="body1">
                <strong>Ano de Nascimento:</strong> {basic?.birthyear || 'Não informado'}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Informações pessoais */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Informações Pessoais
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Trabalho:</strong> {person?.work || 'Não informado'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Estudo:</strong> {person?.study || 'Não informado'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Cidade:</strong> {person?.city || 'Não informado'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Status:</strong> {person?.status || 'Não informado'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Celular:</strong> {person?.cell || 'Não informado'}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Família */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Família e Relacionamentos
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {family?.map((member, index) => (
                <Chip
                  key={index}
                  label={`${member.name}${member.parentesco ? ` (${member.parentesco})` : ''}`}
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Fotos */}
          <Box>
            <Typography variant="h5" gutterBottom>
              Fotos
            </Typography>
            <Grid container spacing={2}>
              {photos?.map((photo, index) => (
                <Grid item xs={4} key={index}>
                  <Card onClick={() => handlePhotoClick(photo)} sx={{ cursor: 'pointer' }}>
                    <CardMedia
                      component="img"
                      image={photo}
                      alt={`Foto ${index + 1}`}
                      sx={{ height: 200, objectFit: 'cover' }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Modal para exibir a foto em tamanho maior */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: '90%',
            maxHeight: '90%',
            outline: 'none',
          }}
        >
          <img
            src={selectedPhoto}
            alt="Foto selecionada"
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Profile;