import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useMediaQueries = () => {
  const theme = useTheme();
  /*
    MUI breakpoints
    xs : 0 : extra-small device
    sm : [0 ; 600] : small device
    md : [600 ; 900] : medium device
    lg : [900 ; 1200] : large device
    xl : [1200 ; 1536] : extra-large device
  */
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumDevice = useMediaQuery(theme.breakpoints.down('md'));

  return { isSmallDevice, isMediumDevice };
};

export { useMediaQueries };