// Core
import PropTypes from 'prop-types';
// Components
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

// ---------------------------------------------------------------------------------
const Contact = ({onClick}) => {
  return (
    <Button 
      variant="contained"
      size="small"
      color='secondary'
      endIcon={<SendIcon sx={{width: 12, height: 12}} />} 
      sx={{
        position: 'fixed',
        right: 5, 
        bottom: 5,
        fontSize: 10,
        textTransform: 'none'
      }}
      onClick={onClick}>
      Contact me
    </Button>
  );
};

Contact.propTypes = {
  onClick: PropTypes.func,
};

export default Contact;