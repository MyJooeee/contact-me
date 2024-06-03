// Components
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


const Contact = () => {
  return (
    <Button 
      variant="contained"
      color="info"
      size="small" 
      endIcon={<SendIcon sx={{ width: 12, height: 12 }} />} 
      sx={{
        position: 'fixed',
        right: 5, 
        bottom: 5,
        fontSize: 10,
        textTransform: 'none'
      }}>
      Contact me
    </Button>
  );
};

export default Contact;