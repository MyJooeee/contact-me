// Core
import * as React from 'react';
// Components
import { blue, blueGrey, grey } from '@mui/material/colors';
import { AppBar, Avatar, Button, Container, Divider, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// Logos
import Aexae from '../Media/Logos/aexae.png';
import LogicImmo from '../Media/Logos/logic-immo.png';
import RciBankAndServices from '../Media/Logos/rci-bank-and-services.png';
import Esgi from '../Media/Logos/esgi.png';
import Itis from '../Media/Logos/itis.png';
// Images
import Jonathan from '../Media/Images/jonathan.jpg';
import Earth from '../Media/Images/earth.jpg';
import Running from '../Media/Images/running.jpg';
import Writing from '../Media/Images/writing-reading.jpg';
import MilkyWay from '../Media/Images/milky-way-galaxy.jpg';
// Local components
import AccordionInfos from './AccordionInfos';
import Contact from './Contact';
import Skills from './Skills';
import Hobby from './Hobby';
// Logic
import { useMediaQueries } from '../hooks/useCustomHooks';
import Project from './Project';
// import ScrollToTop from './ScrollToTop';

// ---------------------------------------------------------------------------------
const navItems = ['Home', 'Experiences', 'Curriculum', 'Skills', 'Projects', 'Hobbies'];

const ContactMe = () => {
  const theme = useTheme();
  const { isMobile, isSmallDevice } = useMediaQueries();

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
        <Typography variant="h4" sx={{ color: 'white' }}>
          Jonathan Dancette
        </Typography>
        <Typography variant="h5" sx={{ color: blueGrey[50] }}>
          Web developper
        </Typography>
        <Typography variant="body1" sx={{ color: blueGrey[50], textAlign: 'center' }}>
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
          pl: isMobile ? 2 : 5, 
          pr: isMobile ? 5 : isSmallDevice ? 15 : 25
        }}>
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h4">
            Experiences
          </Typography>
          <Divider sx={{ bgcolor: theme.palette.info.light }}/>
          <Stack sx={{ pl:2 }}>
            <AccordionInfos 
              id='aexae'
              title='AEXAE'
              object='Web developper Front : REACT JS & Back : PHP, Laravel, NodeJS'
              expanded
              logo={Aexae}
              period='2020 - 2024'
              infos='Front side : interfaces with REACT JS. Automated testing with Mocha. 
                    WebService side : NodeJS.
                    Back side, development in PHP with Laravel and testing with PHPUnit.
                    '
            />
            <AccordionInfos 
              id='logic-immo'
              title='Logic-Immo'
              object='Web developper Back-end PHP, Zend Framework 2'
              logo={LogicImmo}
              period='2018 - 2019'
              infos='
                  Search Engine Optimization (SEO) of Logic-Immo sites. 
                  Developpment in PHP with Zend Framework 2. 
                  Units testing.
                  Agile methodology.
                  '
            />
            <AccordionInfos 
              id='rci-bank-and-services'
              title='RCI Bank and Services'
              object='Study contract, Web developper'
              logo={RciBankAndServices}
              period='2013 - 2017'
              infos='
                  Participation in mainframe to open migration project. 
                  Follow-up and animation of meetings as MOE. 
                  Development of internal PHP tools.
                  '
            />
          </Stack>
        </Stack>
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h4">
          Curriculum
          </Typography>
          <Divider sx={{ bgcolor: theme.palette.info.light }}/>
          <Stack sx={{ pl: 2 }}>
          <AccordionInfos 
              id='esgi-master'
              title='ESGI, Master'
              object='Expert diploma in computer science and information systems engineering'
              expanded
              logo={Esgi}
              period='2015 - 2017'
              infos='Degree recognized by the state level 1. 
                    Theoretical and practical learning through Web projects. 
                    Hackathon Web events with end customers.
                    '
            />
            <AccordionInfos 
              id='esgi-licence'
              title='ESGI, Licence'
              object='Software and network project manager diploma'
              logo={Esgi}
              period='2014 - 2015'
              infos='Degree recognized by the state level 2. 
                    Acquisition of advanced computer skills.
                    '
            />
            <AccordionInfos 
              id='itis-bts'
              title='ITIS, BTS'
              object='IT services for organizations, development option'
              logo={Itis}
              period='2012 - 2014'
              infos='Applications development and maintenance, user support.'
            />
          </Stack>
        </Stack>
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h4">
            Skills
          </Typography>
          <Divider sx={{ bgcolor: theme.palette.info.light }}/>
          <Stack sx={{ gap: 2, pl: 2 }}>
            <Skills 
              title='Languages'
              data={[
                {key: 'PHP', value: 90},
                {key: 'JS', value: 80},
                {key: 'HTML5/CSS3', value: 75}

              ]}/>
               <Skills 
                  title='Frameworks'
                  data={[
                    {key: 'Laravel', value: 80},
                    {key: 'Zend Framework 2', value: 60},
                    {key: 'Symfony', value: 50},
                    {key: 'PHP MVC', value: 95}
              ]}/>
              <Skills 
                  title='Technologies'
                  data={[
                    {key: 'NodeJS', value: 60},
                    {key: 'MySQL', value: 75},
                    {key: 'Git', value: 90}
              ]}/>
              <Skills 
                  title='Librairies'
                  data={[
                    {key: 'REACT JS', value: 85},
                    {key: 'MUI', value: 85},
                    {key: 'MomentJS', value: 75}
              ]}/>
              <Skills 
                  title='Methodology'
                  data={[
                    {key: 'AGILE', value: 80}
              ]}/>
          </Stack>
        </Stack>
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h4">
            Projects
          </Typography>
          <Divider sx={{ bgcolor: theme.palette.info.light }}/>
          <Stack direction='row' sx={{ gap: 2, pl: 2, flexWrap: 'wrap' }}>
            <Project 
              title='Air Flow ©'
              description='
                        Application that detects changes in air quality based on geolocation. 
                        Also provides weather information.
                      '
              skills={['REACT JS', 'HTML5/CSS3', 'MUI', 'Flexbox', 'Leaflet', 'NPM', 'API OpenWeather', 'Functional components']}
              infoLink='Access to the App'
              link='https://myjooeee.github.io/air-flow/'
            />
             <Project 
              title='Build sentences fr ©'
              description='Analyze structure of french words and generation of new words 
                          based on analysis of more than 300 000 words.
                        '
              skills={['PHP', 'Composer', 'POO', 'Dependency injection', 'Services', 'Recursive function', 'Data']}
              infoLink='Access to the Project'
              link='https://github.com/MyJooeee/build-sentences-fr'
            />
            <Project 
              title='Pendulum ©'
              description='Simulation of a simple pendulum based on the equations of pendulum motion.'
                        skills={['REACT JS', 'MUI', 'Flexbox', 'Canvas', 'Animation Frame', 'Physic']}
              infoLink='Access to the App'
              link='https://myjooeee.github.io/pendulum/'
            />
          </Stack>
        </Stack>
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h4">
            Hobbies
          </Typography>
          <Divider sx={{ bgcolor: theme.palette.info.light }}/>
          <Stack direction='row' sx={{ gap: 2, pl: 2, flexWrap: 'wrap' }}>
            <Hobby 
              title='Running'
              description="I try to run regularly or even walk to clear my head and stay cool."
              alt='running image'
              image={Running}
              ownerImage='https://www.flickr.com/photos/104091796@N05/'
            />
            <Hobby 
              title='Writing and reading'
              description="What's better than writing or reading and silence to really find yourself."
              alt='writting reading image'
              image={Writing}
              ownerImage='https://www.flickr.com/photos/jamie238/'
            />
            <Hobby 
              title='Sciences'
              description="Curious by nature, understanding the world we live in is enchanting. Physics is fascinating for me."
              alt='sciences image'
              image={MilkyWay}
              ownerImage='https://www.flickr.com/photos/clemensgilles/'
            />
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
