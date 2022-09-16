import React from 'react';
import { useSelector } from 'react-redux';

import { ReactComponent as LogoDarkIcon } from '../../assets/images/logos/dark-logo-icon.svg';
import { ReactComponent as LogoDarkText } from '../../assets/images/logos/dark-logo-text.svg';
import { ReactComponent as LogoWhiteIcon } from '../../assets/images/logos/white-logo-icon.svg';
import { ReactComponent as LogoWhiteText } from '../../assets/images/logos/white-logo-text.svg';

const AuthLogo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);

  return (
    <div className="p-4 d-flex justify-content-center gap-2">
      {isDarkMode !== false ? (
        <>
          <LogoWhiteIcon />
          <LogoWhiteText />
        </>
      ) : (
        <>
          <LogoDarkIcon />
          <LogoDarkText />
        </>
      )}
    </div>
  );
};

export default AuthLogo;
