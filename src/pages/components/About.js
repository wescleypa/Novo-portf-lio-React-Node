import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PersonIcon from '@mui/icons-material/Person';

const tiers = [
  {
    title: 'Quem é Wescley ?',
    subheader: 'Aprimorado por IA',
    price: '15',
    description: [
      '+ 10 anos programando',
      '+ 1 milhão em linhas de código escritas',
      '+ 100 projetos trabalhados',
      '+ 10.000 horas programando',
      '+ 40 vídeos no Youtube',
      '+ 25.000 visualizações no Youtube',
    ],
    buttonText: 'Vamos conversar',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
    buttonAction: 'http://wa.me/5519996447464'
  }
];

export default function About() {
  return (
    <Container
      id="sobre"
      sx={{
        pb: { xs: 8, sm: 16 },
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
        >
          <PersonIcon />&nbsp;
          Sobre mim
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Um pouco mais sobre mim
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
      >
        {tiers.map((tier) => (
          <Grid
            size={{ xs: 12, sm: 12, md: 12 }}
            key={tier.title}
          >
            <Card
              sx={[
                {
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                },
                ((theme) => ({
                  border: 'none',
                  background:
                    'radial-gradient(circle at 0 1%, hsl(0,0%,92.16%), hsl(209.33,20.55%,80.06%, 0.8))',
                  boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                  ...theme.applyStyles('dark', {
                    background:
                      'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
                    boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                  }),
                })),
              ]}
            >
              <CardContent>
                <Box
                  sx={[
                    {
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                    },
                    tier.title === 'Professional'
                      ? { color: 'grey.100' }
                      : { color: '' },
                  ]}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {(
                    <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />
                  )}
                </Box>
                <Box
                  sx={[
                    {
                      display: 'flex',
                      alignItems: 'baseline',
                    }]}
                >
                  <Typography >
                    <p>Olá, meu nome é <strong>Wescley</strong>, como já deve saber, rs!</p>
                    <p>Sou uma pessoa apaixonada por desafios e movida pela curiosidade. Acredito que a tecnologia tem o poder de transformar o mundo, não apenas no campo científico, mas também impactando a vida das pessoas de maneiras profundas e significativas. Seja criando oportunidades, conectando pessoas ou até mesmo salvando vidas, a tecnologia é a ferramenta que nos permite transformar sonhos em realidade.</p>
                    <blockquote>
                      <em>"Posso não fazer aquilo que gosto, mas sempre vou gostar daquilo que faço."</em>
                    </blockquote>
                    <p>Essa mentalidade me motiva a dar o meu melhor em tudo o que me proponho a realizar, enfrentando cada desafio com dedicação, resiliência e otimismo.</p>
                    <p>Sou organizado, criativo e um eterno aprendiz, sempre em busca de novos conhecimentos e experiências para compartilhar. Acredito que a colaboração e a troca de ideias são essenciais para construir soluções que realmente façam a diferença.</p>
                    <p>Vamos juntos criar algo incrível?</p>
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                  >
                    <CheckCircleRoundedIcon
                      sx={[
                        {
                          width: 20,
                        },
                        tier.title === 'Professional'
                          ? { color: 'primary.light' }
                          : { color: 'primary.main' },
                      ]}
                    />
                    <Typography
                      variant="subtitle2"
                      component={'span'}
                      sx={[
                        tier.title === 'Professional'
                          ? { color: 'grey.50' }
                          : { color: null },
                      ]}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant}
                  color={tier.buttonColor}
                  href={tier.buttonAction}
                  target='_blank'
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}