// Components
import { SvgIcon } from '@mui/material';

// ---------------------------------------------------------------------------------
// Logo de la chaîne, pack v2. Affiché à 32 px : traits ×1,2, comme le prescrit le
// README du pack entre 29 et 40 px (ceux d'origine tombent sous le pixel)
const HyperSciencesIcon = (props) => (
  <SvgIcon viewBox="0 0 512 512" {...props}>
    <circle cx="256" cy="256" r="244" fill="#16213E" />
    <circle cx="256" cy="256" r="196" fill="none" stroke="#1D4ED8" strokeWidth="16.8" />
    <circle cx="272" cy="256" r="158" fill="none" stroke="#3B82F6" strokeWidth="15.1" />
    <circle cx="288" cy="256" r="120" fill="none" stroke="#60A5FA" strokeWidth="13.4" />
    <circle cx="303" cy="256" r="83" fill="none" stroke="#E8B44A" strokeWidth="11.9" />
    <circle cx="319" cy="256" r="45" fill="none" stroke="#E8B44A" strokeWidth="10.2" />
    <circle cx="332" cy="256" r="8" fill="#E8B44A" />
  </SvgIcon>
);

// L'icône YouTube garde ses couleurs d'origine : la charte YouTube interdit de la recolorer
const YouTubeColorIcon = (props) => (
  <SvgIcon viewBox="0 0 28 20" {...props}>
    <path
      fill="#FF0000"
      d="M27.4 3.1A3.5 3.5 0 0 0 24.9.6C22.7 0 14 0 14 0S5.3 0 3.1.6A3.5 3.5 0 0 0 .6 3.1C0 5.3 0 10 0 10s0 4.7.6 6.9a3.5 3.5 0 0 0 2.5 2.5C5.3 20 14 20 14 20s8.7 0 10.9-.6a3.5 3.5 0 0 0 2.5-2.5C28 14.7 28 10 28 10s0-4.7-.6-6.9z"
    />
    <path fill="#FFFFFF" d="M11.2 14.3 18.5 10l-7.3-4.3z" />
  </SvgIcon>
);

export { HyperSciencesIcon, YouTubeColorIcon };
