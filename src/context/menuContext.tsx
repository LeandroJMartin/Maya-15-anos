import { useRouter } from 'next/router';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

interface ContextProps {
  state: boolean;
  openMenu: (value: boolean) => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

const defaultValues = {
  state: false,
  openMenu: (value: boolean) => {
    value;
  }
};

export const MenuContext = createContext<ContextProps>(defaultValues);

export default function MenuProvider({ children }: ModalProviderProps) {
  const [state, setState] = useState(defaultValues.state);

  const openMenu = useCallback((value: boolean) => {
    setState(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => openMenu(false));
    router.events.on('hashChangeStart', () => openMenu(false));

    return () => {
      router.events.off('routeChangeStart', () => openMenu(false));
      router.events.off('hashChangeStart', () => openMenu(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const doc = document.querySelector('html');

    if (!doc) return;

    if (state) {
      doc.style.overflow = 'hidden';
    } else {
      doc.style.overflow = '';
    }
  }, [state]);

  return (
    <MenuContext.Provider value={{ state, openMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
