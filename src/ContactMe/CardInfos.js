// Components
import { Accordion, AccordionSummary, AccordionDetails, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';

const CardInfos = ({ id, infos, logo, object, period, title }) => {

  return (
      <Accordion sx={{ boxShadow: 3 }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={id}
          id={id}
        >
          <Stack 
            direction='row'
            sx={{ gap: 5 }}>
            <img
              alt={`${title} logo`}
              srcSet={logo}
              width={120}
            />
            <Stack gap={1}>
              <Typography variant="h5"> {object} </Typography>
              <Typography variant="h6"> {period} </Typography>
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