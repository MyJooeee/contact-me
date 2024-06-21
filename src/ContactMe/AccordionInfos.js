// Core
import PropTypes from 'prop-types';
// Components
import { Accordion, AccordionSummary, AccordionDetails, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';

// ---------------------------------------------------------------------------------
const AccordionInfos = ({id, infos, isSmallDevice, expanded, logo, object, period, title}) => {

  return (
      <Accordion defaultExpanded={expanded} sx={{ boxShadow: 3, minHeight: 100 }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={id}
          id={id}
        >
          <Stack 
            direction='row'
            sx={{gap: 5, alignItems: 'center'}}>
            <img
              alt={`${title} logo`}
              srcSet={logo}
              width={80}
            />
            <Stack gap={1}>
            <Typography variant={isSmallDevice ? 'h6' : 'h5'}>{title}</Typography>
              <Typography variant={isSmallDevice ? 'h7' : 'h6'}>{object}</Typography>
              <Typography variant={isSmallDevice ? 'h8' : 'h7'}>{period}</Typography>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: grey[50]}}>
         {infos}
        </AccordionDetails>
      </Accordion>
  );
};

AccordionInfos.propTypes = {
  id: PropTypes.string,
  infos: PropTypes.string,
  isSmallDevice: PropTypes.bool,
  expanded: PropTypes.bool,
  logo: PropTypes.node,
  object: PropTypes.string,
  period: PropTypes.string,
  title: PropTypes.string
};

export default AccordionInfos;