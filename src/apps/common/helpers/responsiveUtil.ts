import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }: any) => {

  const isDesktop = useMediaQuery({ minDeviceWidth: 768 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }: any) => {
  const isTablet = useMediaQuery({ minDeviceWidth: 768, maxDeviceWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxDeviceWidth: 767 });
  return isMobile ? children : null;
};

export { Desktop, Tablet, Mobile };