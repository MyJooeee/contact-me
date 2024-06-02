// Core
import * as React from 'react';
// Components
import { blue, blueGrey, grey } from '@mui/material/colors';
import { AppBar, Avatar, Button, Container, Divider, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import Accordion from './CardInfos';
import { useTheme } from '@mui/material/styles';
import Jonathan from '../Images/jonathan.jpg';
import Earth from '../Images/earth.jpg';
import Aexae from '../Images/aexae.png';
import Contact from './Contact';
// import ScrollToTop from './ScrollToTop';

// ---------------------------------------------------------------------------------
const navItems = ['Home', 'Experiences', 'Curriculum', 'Skills', 'Projects', 'Hobbies'];

const ContactMe = () => {

  const theme = useTheme();

  // JSX -------------------------------------------------------------------------
  return (
    <Container  id="back-to-top-anchor" maxWidth={false} disableGutters>
      <Stack 
        sx={{ 
          alignItems: 'center', 
          backgroundImage: `url(${Earth})`, 
          gap: 1, 
          p: 1 
        }}>
        <Avatar alt="Jonathan Dancette" src={Jonathan} sx={{ width: 96, height: 96 }} />
        <Typography variant="h4" sx={{ textAlign: 'center', color: 'white' }}>
          Jonathan Dancette
        </Typography>
        <Typography variant="h5" sx={{ color: blueGrey[50] }}>
          Web developper
        </Typography>
        <Typography variant="body1" sx={{ color: blueGrey[50] }}>
          Hello world ! I'm Jonathan Dancette, Web developper. I am open-minded boy who likes discover new things. 
        </Typography>
      </Stack>
      <AppBar position="sticky">
        <Toolbar disableGutters sx={{ columnGap: 2, pl: 5, flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <Button key={item} sx={{ color: 'white' }}>
              {item}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Stack 
        sx={{ 
          backgroundColor: grey[200],
          gap: 5,
          py: 2, 
          pl: 5, 
          pr: 15
        }}>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="h4">
            Experiences
          </Typography>
          <Divider sx={{ bgcolor: theme.palette.info.light }}/>
          <Stack sx={{ pl:2 }}>
            <Accordion 
              id='aexae'
              title='AEXAE'
              object='Web developper Front : REACT JS & Back : PHP, Laravel.'
              logo={Aexae}
              period='2020 - 2024'
              infos='Côté Front, interfaces REACT JS et NodeJS côté WebService.
                    Tests automatisés.
                    Côté Back, développement en PHP sous Laravel
                    Tests unitaires.'
            />
          </Stack>
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="h4">
          Curriculum
          </Typography>
          <Divider sx={{ bgcolor: theme.palette.info.light }}/>
          <Stack sx={{ pl: 2 }}>
          </Stack>
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="h4">
            Skills
          </Typography>
          <Divider sx={{ bgcolor: theme.palette.info.light }}/>
          <Stack sx={{ pl: 2 }}>
          </Stack>
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="h4">
            Hobbies
          </Typography>
          <Divider sx={{ bgcolor: theme.palette.info.light }}/>
          <Stack sx={{ pl: 2 }}>
          </Stack>
        </Stack>
      </Stack>
      <Stack>
        <Stack 
          direction="row" 
          sx={{ 
            backgroundColor: blue[800], 
            height: 30, 
            justifyContent: 'center', 
            gap: 5, 
            pt: 1 
          }}>
          <Typography variant="body2" sx={{ color: 'white' }} >Linkedin</Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>Github</Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>HyperSciences</Typography>
        </Stack>
        <Stack 
          direction="row" 
          sx={{ 
            backgroundColor: blue[900], 
            justifyContent: 'flex-start', 
            py: 1, 
            pl: 5 
          }}
        >
          <Typography variant="body2" sx={{ color: 'white' }} >© 2024 Jonathan Dancette | v1.0.0 </Typography>
        </Stack>
      </Stack>
      <Contact />
    </Container>
  );
};

export default ContactMe;
