import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Chip,
  Skeleton,
  CircularProgress,
  TextField,
  Button,
  Container,
  Collapse,
  IconButton,
  Grid2,
} from '@mui/material';
import Profile from './Profile';
import CodeIcon from '@mui/icons-material/Code';
import { ArrowBack } from '@mui/icons-material';

const Facebook = ({ setActiveContent, setSubSelected }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const handleSearch = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post('https://api.souwescley.com:3001/search-people', {
        string: searchTerm,
        maxResults: 12,
      });
      setData(response.data);
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectProfile = async (item) => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.souwescley.com:3001/getProfile', {
        href: item.href,
        name: item.name,
      });
      setProfileData(response.data);
      setShowProfile(true);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    setSubSelected(null);
    setActiveContent(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 8 }}>
      <Container
        sx={{
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          mt: 4,
        }}
      >
        <Grid2 container>
          <Grid2 item sx={{ position: 'absolute', left: { xs: 0, md: 40 } }}>
            {/* Botão de voltar */}
            <IconButton aria-label="back" sx={{ fontSize: 15, mb: 4 }} onClick={() => back()}>
              <ArrowBack />&nbsp;Voltar
            </IconButton>
          </Grid2>
          <Grid2 item>
            <Typography
              component="h2"
              variant="h4"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              gutterBottom
            >
              <CodeIcon />
              &nbsp;Facebook infos
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Obtenha informações pessoais públicas de pessoas do Facebook.
            </Typography>
          </Grid2>
        </Grid2>
      </Container>

      {/* Formulário de busca */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <TextField
          label="Digite algo..."
          placeholder="Digite uma palavra, uma letra ou algo para buscar..."
          variant="outlined"
          sx={{ width: { xs: 300, md: 500 } }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
        />
        <Button
          variant="outlined"
          sx={{ height: '55px' }}
          onClick={handleSearch}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </Box>

      {/* Lista de resultados ou perfil selecionado */}
      <Collapse in={showProfile}>
        <Profile profileData={profileData} setShowProfile={setShowProfile} />
      </Collapse>
      <Collapse in={!showProfile}>
        <Box sx={{ mt: 4, display: 'flex', gap: { xs: 2, sm: 4 }, flexWrap: 'wrap', justifyContent: 'center' }}>
          {loading ? (
            <Card sx={{ maxWidth: { sm: 300, xs: 200 } }}>
              <Skeleton variant="rectangular" height={140} width={300} />
              <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </CardContent>
            </Card>
          ) : (
            data?.map((item) => (
              <Chip
                key={item.username}
                label={(
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Avatar sx={{ width: 60, height: 60 }} src={item.photo} alt={item.name} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body" sx={{ color: 'text.secondary' }}>
                        {item.info && item.info !== 'Adicionar aos amigos' ? item.info : ''}
                      </Typography>
                    </Box>
                  </Box>
                )}
                sx={{
                  height: 100,
                  width: 400,
                  cursor: 'pointer',
                  '&:hover': { transform: 'scale(1.01)' },
                }}
                variant="outlined"
                onClick={() => selectProfile(item)}
              />
            ))
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default Facebook;