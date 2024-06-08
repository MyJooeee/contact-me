// Core
import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { fetchApi } from '../api';
// Components
import { blue, blueGrey, grey, purple } from '@mui/material/colors';
import { Alert, AppBar, Avatar, Button, Container, Divider, Drawer, Link, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
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
import Project from './Project';
import Hobby from './Hobby';
// Logic
import { useMediaQueries } from '../hooks/useCustomHooks';

// ---------------------------------------------------------------------------------
const ContactMe = () => {
  const APP_VERSION = process.env.REACT_APP_VERSION;
  const urlSpotAccessToken = process.env.REACT_APP_SPOTIFY_URL_ACCESS_TOKEN;
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const urlSpotArtists = process.env.REACT_APP_SPOTIFY_URL_ARTISTS;
  const topSpotArtists = process.env.REACT_APP_SPOTIFY_MY_TOP_ARTISTS;

  const theme = useTheme();
  const { isMobile, isSmallDevice } = useMediaQueries();
  const [navMenuId, setNavMenuId] = useState('home-section');
  const sections = useRef([]);
  const refHome = useRef();
  const refExperiences = useRef();
  const refCurriculum = useRef();
  const refSkills = useRef();
  const refProjects = useRef();
  const refHobbies = useRef();
  const navItems = [
    {
      id: 'home-section',
      nav: 'Home',
      ref: refHome
    },
    {
      id: 'experiences-section',
      nav: 'Experiences',
      ref: refExperiences
    },
    {
      id: 'curriculum-section',
      nav: 'Curriculum',
      ref: refCurriculum
    },
    {
      id: 'skills-section',
      nav: 'Skills',
      ref: refSkills
    },
    {
      id: 'projects-section',
      nav: 'Projects',
      ref: refProjects
    },
    {
      id: 'hobbies-section',
      nav: 'Hobbies',
      ref: refHobbies
    }
  ];

  const [openDrawer, setOpenDrawer] = useState(false);

  // Effects ---------------------------------------------------------------------
  useEffect(() => {
    sections.current = document.querySelectorAll('[data-section]');
    window.addEventListener('scroll', handleScroll);

    const localToken = localStorage.getItem("accessToken");
    const localTokenTime = localStorage.getItem("accessTokenTime");
    const seconds = moment().diff(moment(localTokenTime), 'seconds');

    // Token is still valid
    if (localToken && seconds < 3600) {
      getSpotifyData(localToken).then((data) => {
        console.log('data', data);
      });
    // If no token or expired : new token
    } else {
      getAccessToken().then((accessToken) => {
        getSpotifyData(accessToken).then((data) => {
          console.log('data', data);
        });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("accessTokenTime", moment().format("YYYY-MM-DD HH:mm:ss"));
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Functions -------------------------------------------------------------------  
  const getAccessToken = async () => {
    try {
      const authOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
        json: true
      };
      const response = await fetchApi(`${urlSpotAccessToken}`, authOptions, (error) => {
        console.log(error);
        return;
      });
      if (response.error) {
        console.log(response.error);
        return;
      }
      return response.access_token;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const getSpotifyData = async (token) => {
    try {
      const authOptions = {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      };
      const response = await fetchApi(`${urlSpotArtists}?ids=${topSpotArtists}`, authOptions, (error) => {
        console.log(error);
        return;
      });

      return response;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  // Handlers --------------------------------------------------------------------
  const handleScroll = () => {
    const pageYOffset = window.scrollY;
    let newActiveSection = null;

    // Fire last nav section if bottom of page is reached
    const bottomOfPageReached = Math.ceil(window.innerHeight + pageYOffset) >= document.documentElement.scrollHeight;

    sections.current.forEach((section) => {
      const sectionOffsetTop = section.offsetTop - 75; // 75 : Menu navbar height compensation
      const sectionHeight = section.offsetHeight + 75;

      if ((pageYOffset >= sectionOffsetTop || bottomOfPageReached) && pageYOffset < sectionOffsetTop + sectionHeight) {
        newActiveSection = section.id;
      }
    });

    setNavMenuId(newActiveSection);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  // JSX -------------------------------------------------------------------------
  return (
    <Container ref={refHome} maxWidth={false} disableGutters>
      <Stack 
        id='home-section'
        data-section
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
        <Alert severity="success">Open for a job in Web development</Alert>
      </Stack>
      <AppBar position="sticky">
        <Toolbar disableGutters sx={{ columnGap: 2, pl: 5, flexWrap: 'wrap' }}>
          {navItems.map((item, idx) => (
            <Button
              key={idx}
              sx={{color: 'white', fontWeight: navMenuId === item.id ? 'bold' : 'normal'}}
              onClick={() => {
                item.ref.current?.scrollIntoView({
                  behavior: 'smooth'
                });
                }
              }
            >
              {item.nav}
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
        <Stack id='experiences-section' data-section ref={refExperiences} sx={{ gap: 2 }}>
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
        <Stack id='curriculum-section' data-section ref={refCurriculum} sx={{ gap: 2 }}>
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
        <Stack id='skills-section' data-section ref={refSkills} sx={{ gap: 2 }}>
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
        <Stack id='projects-section' data-section ref={refProjects} sx={{ gap: 2 }}>
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
              skills={['REACT JS', 'HTML5/CSS3', 'MUI', 'Skeleton', 'Flexbox', 'Leaflet', 'NPM', 'API OpenWeather', 'Functional components']}
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
        <Stack id='hobbies-section' data-section ref={refHobbies} sx={{ gap: 2 }}>
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
          <Link color='white' target="_blank" variant='caption' href='https://fr.linkedin.com/in/jonathan-dancette-72627a61' underline="none">Linkedin</Link> 
          <Link color='white' target="_blank" variant='caption' href='https://github.com/MyJooeee' underline="none">Github</Link> 
          <Link color='white' target="_blank" variant='caption' href='http://hypersciences.space' underline="none">HyperSciences</Link> 
        </Stack>
        <Stack 
          direction="row" 
          sx={{ 
            backgroundColor: blue[900], 
            justifyContent: 'flex-start', 
            py: 1, 
            pl: 5 
          }}>
          <Typography variant="body2" sx={{ color: 'white' }}>© 2024 Jonathan Dancette, all rights reserved. | v{APP_VERSION}</Typography>
        </Stack>
      </Stack>
      <Drawer
        anchor='bottom'
        open={openDrawer}
        onClose={toggleDrawer(false)}>
       <Stack 
          direction='row' 
          sx={{ 
            backgroundColor: purple[50],
            alignItems: 'center', 
            justifyContent: 'center', 
            p: 3, 
            gap: 2
        }}>
          <ContactMailIcon />
          <Typography variant='overline'>To get my CV or just contact me : dancette.jonathan@gmail.com</Typography>
       </Stack>
      </Drawer>
      <Contact onClick={toggleDrawer(true)} />
    </Container>
  );
};

export default ContactMe;
