// Core
import * as React from 'react';
// Components
import { blueGrey } from '@mui/material/colors';
import { AppBar, Avatar, Button, Container, Divider, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import Accordion from './Accordion';
// import { useTheme } from '@mui/material/styles';
import Jonathan from '../Images/jonathan.jpg';
// import ScrollToTop from './ScrollToTop';

// ---------------------------------------------------------------------------------
const navItems = ['Home', 'Experiences', 'Diplomas', 'Skills'];

const ContactMe = () => {

  // const theme = useTheme();

  // JSX -------------------------------------------------------------------------
  return (
    <Container  id="back-to-top-anchor" maxWidth={false} disableGutters>
      <Stack sx={{ alignItems: 'center', backgroundColor: blueGrey[700], gap: 1, py: 1 }}>
        <Avatar alt="Jonathan Dancette" src={Jonathan} sx={{ width: 96, height: 96 }} />
        <Typography variant="h4" sx={{ color: 'white' }}>
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
        <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          JD
        </Typography>
        <Stack direction="row">
          {navItems.map((item) => (
            <Button key={item} sx={{ color: '#fff' }}>
              {item}
            </Button>
          ))}
        </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Stack sx={{ gap: 1 }}>
        <Typography variant="h4">
          Experiences
        </Typography>
        <Divider sx={{ bgcolor: (theme) => theme.palette.info.light }}/>
        <Stack>
          <Accordion />
        </Stack>
      </Stack>
      <Stack sx={{ gap: 1 }}>
        <Typography variant="h4">
          Experiences
        </Typography>
        <Divider sx={{ bgcolor: (theme) => theme.palette.info.light }}/>
        <Stack>
          <Accordion />
        </Stack>
      </Stack>
      <Stack sx={{ gap: 1 }}>
        <Typography variant="h4">
          Experiences
        </Typography>
        <Divider sx={{ bgcolor: (theme) => theme.palette.info.light }}/>
        <Stack>
          <Accordion />
        </Stack>
      </Stack>
    </Container>
  );
};

export default ContactMe;
