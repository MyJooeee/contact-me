import { Slider, Stack, Typography } from '@mui/material';

// ---------------------------------------------------------------------------------
const Skills = ({ title, data}) => {

  return (
    <Stack sx={{ gap: 2}}>
        <Typography variant='h5' color='primary'> {title} </Typography>
        <Stack sx={{ gap: 1 }}>
        {data.map((item, idx) => (
          <Stack direction="row" key={idx}>
            <Typography variant='body2' sx={{ minWidth: 150 }}> {item.key} </Typography>
            <Slider 
              defaultValue={item.value} 
              aria-label="Default" 
              valueLabelDisplay="auto" 
              sx={{ pointerEvents: 'none !important' }}
            />
          </Stack>
          ))}
        </Stack>
        
    </Stack>
  );

};

export default Skills;