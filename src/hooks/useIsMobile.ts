import { useState, useEffect } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      }
    }
  }, []);

  return { isMobile };
}

export default useIsMobile;
