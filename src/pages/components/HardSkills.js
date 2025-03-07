import * as React from 'react';
import { useState } from 'react'; // Importando useState
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Importando o botão
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import DeveloperModeRoundedIcon from '@mui/icons-material/DeveloperModeRounded';
import SettingsEthernetRoundedIcon from '@mui/icons-material/SettingsEthernetRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import ApiRoundedIcon from '@mui/icons-material/ApiRounded';
import DataThresholdingRoundedIcon from '@mui/icons-material/DataThresholdingRounded';
import TerminalIcon from '@mui/icons-material/Terminal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const hardSkills = [
  {
    icon: <CodeRoundedIcon />,
    title: 'Node.js',
    description:
      'Atuei por mais de 5 anos desenvolvendo aplicações escaláveis e de alta performance com Node.js. Desde APIs RESTful até sistemas em tempo real com WebSockets.',
  },
  {
    icon: <CloudRoundedIcon />,
    title: 'Amazon Web Services (AWS)',
    description:
      'Experiência em projetos com EC2, S3, Lambda, RDS e VPC. Implementei soluções de infraestrutura na nuvem para garantir escalabilidade e segurança.',
  },
  {
    icon: <StorageRoundedIcon />,
    title: 'Banco de Dados',
    description:
      'Domínio em bancos relacionais (MySQL, PostgreSQL) e não relacionais (MongoDB). Projetos envolvendo modelagem de dados, otimização de queries e migrações.',
  },
  {
    icon: <DataObjectRoundedIcon />,
    title: 'APIs e Integrações',
    description:
      'Desenvolvimento de APIs RESTful e GraphQL, além de integrações com serviços de terceiros como PagSeguro, MercadoPago e WhatsApp.',
  },
  {
    icon: <DeveloperModeRoundedIcon />,
    title: 'Frameworks Front-end',
    description:
      'Experiência com React, Angular e Vue.js para criação de interfaces modernas e responsivas, com foco em performance e usabilidade.',
  },
  {
    icon: <SettingsEthernetRoundedIcon />,
    title: 'DevOps e CI/CD',
    description:
      'Configuração de pipelines de CI/CD com GitHub Actions, Docker e Kubernetes. Automatização de processos para entrega contínua e alta disponibilidade.',
  },
  // Hard skills adicionais
  {
    icon: <SecurityRoundedIcon />,
    title: 'Segurança da Informação',
    description:
      'Implementação de práticas de segurança como autenticação JWT, OAuth2 e criptografia de dados para proteger aplicações e APIs.',
  },
  {
    icon: <ApiRoundedIcon />,
    title: 'Microserviços',
    description:
      'Desenvolvimento e manutenção de arquiteturas baseadas em microserviços, garantindo escalabilidade e desacoplamento.',
  },
  {
    icon: <DataThresholdingRoundedIcon />,
    title: 'Análise de Dados',
    description:
      'Experiência com ferramentas de análise de dados como Pandas, NumPy e Tableau para extrair insights e tomar decisões estratégicas.',
  },
];

export default function HardSkills() {
  const [showMore, setShowMore] = useState(false); // Estado para controlar a visibilidade

  // Define quantas habilidades são exibidas inicialmente
  const initialSkills = 6;
  const visibleSkills = showMore ? hardSkills : hardSkills.slice(0, initialSkills);

  return (
    <Box
      id="hard-skills"
      sx={{
        pt: 4,
        pb: 8,
        color: 'white',
        bgcolor: 'grey.900',
        borderRadius: '20px 20px 0 0',
        mt: { xs: 2, sm: 6 }
      }}
    >
      <Container
        sx={{
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
          <Typography component="h2" variant="h4"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            gutterBottom
          >
            <TerminalIcon />&nbsp;
            Hard Skills
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Minhas principais habilidades técnicas, adquiridas ao longo de anos de experiência em desenvolvimento de software e infraestrutura.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {visibleSkills.map((skill, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.01)'
                  }
                }}
              >
                <Box sx={{ opacity: '50%' }}>{skill.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {skill.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {skill.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
        {/* Botão "Ver mais" */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShowMore(!showMore)}
          sx={{ mt: 4 }}
        >
          {showMore
            ? (<>Ver menos <ExpandLessIcon /></>)
            : (<>Ver mais <ExpandMoreIcon /></>)}
        </Button>
      </Container>
    </Box>
  );
}