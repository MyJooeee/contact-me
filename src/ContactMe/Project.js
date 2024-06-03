// Core
import PropTypes from 'prop-types';
// Components
import { Card, CardContent, Chip, Link, Stack, Typography   } from '@mui/material';

const Project = ({description, infoLink, link, skills, title}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Stack sx={{ gap: 2 }}> 
          <Stack> 
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Stack>
          <Stack direction='row' sx={{flexWrap: 'wrap', gap: 0.5}}>
          {skills.map((item, idx) => (
            <Chip key={idx} label={item} color="primary" />
          ))}
          </Stack>
          <Stack direction='row' sx={{alignItems: 'center', justifyContent: 'center', gap: 1}}>
          <Typography variant='caption'>{infoLink} :</Typography>
          <Link target="_blank" variant='caption' href={link} underline="none">{title}</Link> 
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

Project.propTypes = {
  description: PropTypes.string,
  infoLink: PropTypes.string,
  link: PropTypes.string,
  skills: PropTypes.array,
  title: PropTypes.string
}

export default Project;