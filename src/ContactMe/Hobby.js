// Core
import PropTypes from 'prop-types';
// Components
import { Box, Card, CardMedia, CardContent, Link, Typography   } from '@mui/material';

const Hobby = ({ image, alt, ownerImage, title, description }) => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={alt}
          />
          <Box 
            sx={{
              position: "absolute", 
              color: "white",
              bottom: 1,
              right: 2
            }}>
            <Link target="_blank" href={ownerImage} underline="none">©</Link> 
          </Box>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
};

Hobby.propTypes = {
  image: PropTypes.node,
  alt: PropTypes.string,
  ownerImage: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Hobby;