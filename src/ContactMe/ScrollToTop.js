import { Button, useScrollTrigger, Slide, Stack } from '@mui/material';
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollToTop = () => {

    const trigger = useScrollTrigger();

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Slide in={trigger}>
      <Stack onClick={handleClick} sx={{ position: 'fixed', bottom: 5, right: 5 }}>
        <Button color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Button>
      </Stack>
    </Slide>
  );
};

export default ScrollToTop;