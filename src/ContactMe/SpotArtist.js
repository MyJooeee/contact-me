// Core
import PropTypes from 'prop-types';
// Components
import { green } from '@mui/material/colors';
import { Card, CardActions, CardContent, CardMedia, Chip, Button, Typography, Stack } from '@mui/material';

// ---------------------------------------------------------------------------------
const SpotArtist = ({ followers, genres, href, image, name }) => {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: image.height, width: image.width }}
        image={image.url}
        title={name}
      />
      <CardContent>
        <Stack sx={{ gap: 2 }}> 
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Stack direction='row' sx={{flexWrap: 'wrap', gap: 0.5}}>
              {genres.map((genre, idx) => (
                <Chip key={idx} label={genre} sx={{ backgroundColor: green.A400}} />
              ))}
          </Stack>
          <Typography variant="caption" color="text.secondary">
            Number of followers on Spotify : <strong>{followers}</strong>.
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="small" target="_blank" href={href}>Discover</Button>
      </CardActions>
    </Card>
  );
};

SpotArtist.propTypes = {
  followers: PropTypes.string,
  genres: PropTypes.array,
  href: PropTypes.string,
  image: PropTypes.object,
  name: PropTypes.string
}

export default SpotArtist;
