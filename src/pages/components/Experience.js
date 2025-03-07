import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';

const experiences = [
  {
    duration: '01 ano',
    icon: <RepeatIcon />,
    company: 'Bravo serviços logísticos',
    role: 'Analista de Sistemas (Promovido)',
  },
  {
    duration: '08 meses',
    icon: <CodeIcon />,
    company: 'Bravo serviços logísticos',
    role: 'Assistente de Sistemas II',
  },
  {
    duration: '03 anos',
    icon: <LaptopMacIcon />,
    company: 'ConectD Games',
    role: 'Sócio gerente (PJ) 54.350.903/0001-21',
  },
  {
    duration: '01 ano',
    icon: <LaptopMacIcon />,
    company: 'Megsone Technologies',
    role: 'Proprietário & desenvolvedor',
  },
  {
    duration: '01 ano',
    icon: <LaptopMacIcon />,
    company: 'Xtreme technology',
    role: 'Proprietário e desenvolvedor',
  },
  {
    duration: '07 meses',
    icon: <LaptopMacIcon />,
    company: 'Xtreme Paulínia - Cell e lan House',
    role: 'Proprietário (3 funcionários)',
  },
];

export default function Experience() {
  return (
    <Container
      sx={{
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
        mt: 4,
        mb: 8,
      }}
      id="experiencia"
    >
      <Container
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >
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
          <WorkIcon />&nbsp;
          Experiência
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Minhas principais experiências no mundo da tecnologia.
        </Typography>
      </Container>
      <Timeline position="alternate">
        {experiences.map((exp, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {exp.duration}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color='primary'>{exp.icon}</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                {exp.company}
              </Typography>
              <Typography>{exp.role}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
}