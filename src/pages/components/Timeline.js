import React from 'react';
import { Box, Grid2 as Grid, Typography, Paper } from '@mui/material';
import { useInView } from 'react-intersection-observer';  // Importando o hook
import One from '../../assets/images/Timeline/1.svg';
import Two from '../../assets/images/Timeline/2.svg';
import Tree from '../../assets/images/Timeline/3.svg';
import Four from '../../assets/images/Timeline/4.svg';
import Five from '../../assets/images/Timeline/5.svg';
import Six from '../../assets/images/Timeline/6.svg';
import BookIcon from '@mui/icons-material/Book';

const timelineData = [
  {
    title: '🚀 Como comecei na Tecnologia',
    description: "Minha jornada na tecnologia começou por pura curiosidade. Sempre gostei de entender como as coisas funcionam, desmontar objetos e tentar remontá-los. A primeira vez que sentei em frente a um computador foi um misto de fascínio e desafio. Não demorou muito para que eu percebesse que queria mais do que ser apenas um usuário; eu queria criar, construir e transformar. O primeiro 'Olá, Mundo!' que escrevi foi mágico, e desde então não parei mais.",
    image: One
  },
  {
    title: '💡 Minhas motivações',
    description: 'O que me motiva todos os dias é a possibilidade de fazer a diferença. A tecnologia não é apenas código ou máquinas; é uma ponte para melhorar vidas, resolver problemas e criar conexões. Cada desafio que enfrento me motiva ainda mais, porque sei que, ao superá-lo, estarei mais perto de construir algo significativo. Além disso, ver pessoas utilizando soluções que eu criei me dá uma sensação incrível de realização.',
    image: Two
  },
  {
    title: '🌟 Minha inspiração',
    description: 'Minha maior inspiração na tecnologia é Elon Musk. O que mais admiro nele é a maneira como utiliza a tecnologia para resolver problemas reais, como a Starlink, que oferece internet para pessoas em áreas remotas, longe das grandes cidades, permitindo acesso à conectividade onde antes era impossível. Além disso, ele criou o incrível foguete reutilizável, que é capaz de pousar sozinho, quebrando a frase possívelmente mais famosa da história (Foguete não tem ré), agora tem rs. revolucionando a exploração espacial e tornando o impossível acessível. Sua visão prática e ousada de como a tecnologia pode impactar a vida das pessoas me inspira a buscar soluções inovadoras e transformar desafios em oportunidades.',
    image: Tree
  },
  {
    title: '🔥 Desafios e lições',
    description: 'Minha trajetória não foi isenta de desafios, e sou grato por isso. Tive momentos em que me senti sobrecarregado, projetos que não deram certo e até dúvidas sobre minha capacidade. Mas cada obstáculo me ensinou algo valioso: a importância de persistir, de aprender com os erros e de valorizar cada pequeno progresso. Hoje, vejo os desafios como oportunidades para crescer, tanto profissionalmente quanto pessoalmente.',
    image: Four
  },
  {
    title: '🌍 Visão de futuro',
    description: 'Minha visão de futuro não gira apenas em torno da tecnologia; também quero crescer como pessoa, me aperfeiçoando e me tornando alguém melhor a cada dia. Quero construir um futuro onde a tecnologia seja um meio poderoso de transformação, não apenas para facilitar a vida das pessoas, mas para literalmente mudá-la. Sonho em usar a tecnologia para melhorar o acesso a serviços essenciais, como hospitais, clínicas e iniciativas voltadas para quem mais precisa, seja pela falta de recursos ou de oportunidades. Minha missão é fazer com que a tecnologia não seja só uma ferramenta, mas um caminho de esperança e renovação para aqueles que, muitas vezes, não têm voz.',
    image: Five
  },
  {
    title: '🌴 Vida fora daqui',
    description: 'Apesar de amar o que faço, acredito no equilíbrio. Fora da tecnologia, gosto de aproveitar momentos simples, como estar com amigos, família ou simplesmente relaxar. Tenho hobbies que me ajudam a desconectar, como assistir séries de ficção ou sentar na calçada e olhar as estrelas, e sempre busco um tempo para recarregar as energias. Acredito que nossas paixões fora do trabalho também refletem em quem somos como profissionais, e tento trazer esse equilíbrio para tudo o que faço.',
    image: Six
  },
];

const Timeline = () => {  
  return (
    <div
      style={{
        pb: 8,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
      id="historia"
    >
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Um pouco mais...
        </Typography>
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
          <BookIcon />&nbsp;
          Minha história
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, padding: { xs: 2, md: 10 } }}>
        {timelineData.map((item, index) => {
          return (
            <TimelineItem key={index} item={item} index={index} />
          );
        })}
      </Box>
    </div>
  );
};

const TimelineItem = ({ item, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once
    threshold: 0.3,    // Element should be 30% visible
  });

  return (
    <Grid
      container
      direction={index % 2 === 0 ? 'row' : 'row-reverse'}
      alignItems="center"
      sx={{
        marginBottom: 4,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-100px)', // Start from left
        transition: 'all 0.6s ease-out', // Smooth transition
      }}
      spacing={{ xs: 0, md: 4 }}
      ref={ref}
    >
      {/* Foto */}
      <Grid item>
        <Box display="flex" justifyContent="center">
          <Box
            component="img"
            src={item.image}
            alt={item.title}
            sx={{ width: { xs: '250px', md: '350px' } }}
          />
        </Box>
      </Grid>

      {/* Descrição */}
      <Grid item>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            maxWidth: { xs: 'auto', md: 500 },
            boxShadow: `grey 1px 1px 10px`,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body1">
            {item.description}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Timeline;
