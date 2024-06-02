// Components
import { Accordion, AccordionSummary, AccordionDetails, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';

const CardInfos = ({ id, infos, expanded, logo, object, period, title }) => {

  return (
      <Accordion defaultExpanded={expanded} sx={{ boxShadow: 3, minHeight: 100 }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={id}
          id={id}
        >
          <Stack 
            direction='row'
            sx={{ gap: 5, alignItems: 'center' }}>
            <img
              alt={`${title} logo`}
              srcSet={logo}
              width={80}
            />
            <Stack gap={1}>
            <Typography variant="h5"> {title} </Typography>
              <Typography variant="h6"> {object} </Typography>
              <Typography variant="h7"> {period} </Typography>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: grey[50] }}>
         {infos}
        </AccordionDetails>
      </Accordion>
  );
};

export default CardInfos;