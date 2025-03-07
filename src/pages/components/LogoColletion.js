import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const whiteLogos = [
  'https://i.imgur.com/CnkYvlu.png',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
  'https://i.imgur.com/CnkYvlu.png',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
  width: '100px',
  height: '80px',
  margin: '0 32px',
  opacity: 0.7,
};

export default function LogoCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="h6"
        align="center"
        sx={{ color: 'text.secondary' }}
      >
        Quem sou eu ?
      </Typography>
      <Grid container sx={{ justifyContent: 'center', mt: 0.5, opacity: 0.6 }}>
        Hello, meu nome é Wescley, como já deve saber, rs.<br/>
        Sou uma pessoa apaixonada por desafios e movida pela curiosidade. Acredito que a tecnologia tem o poder de mudar o mundo, não apenas no campo científico, mas também impactando a vida das pessoas de maneira significativa. Seja criando empregos, conectando pessoas ou até mesmo salvando vidas, a tecnologia é a ferramenta que nos permite transformar sonhos em realidade.<br/>
        Sempre levei comigo uma frase que reflete a minha forma de encarar a vida: "Posso não fazer aquilo que gosto, mas sempre vou gostar daquilo que faço."Essa mentalidade me motiva a dar o meu melhor em tudo o que me proponho a realizar, enfrentando cada desafio com dedicação e otimismo.<br/>
<br/>
        Sou organizado, criativo e sempre em busca de aprender e compartilhar conhecimento. Vamos juntos construir algo que realmente faça a diferença?
      </Grid>
    </Box>
  );
}