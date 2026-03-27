import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useMediaQueries = () => {
  const theme = useTheme();
  /*
    MUI breakpoints
    xs : [0 ; 600[
    sm : [600 ; 900[
    md : [900 ; 1200[
    lg : [1200 ; 1536[
    xl : [1536 ; ∞[
  */
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumDevice = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeDevice = useMediaQuery(theme.breakpoints.down('lg'));
  const isExtraLargeDevice = useMediaQuery(theme.breakpoints.down('xl'));

  return { isSmallDevice, isMediumDevice, isLargeDevice, isExtraLargeDevice};
};

export { useMediaQueries };