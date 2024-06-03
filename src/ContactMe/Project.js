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
        <Typography variant='body2'>{infoLink} :</Typography>
        <Link target="_blank" href={link} underline="none">{title}</Link> 
        </Stack>
      </Stack>
    </CardContent>
  </Card>
  );
};

export default Project;