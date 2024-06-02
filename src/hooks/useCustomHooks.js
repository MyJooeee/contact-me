import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useMediaQueries = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('lg'));

  return { isMobile, isSmallDevice };
};

export { useMediaQueries };