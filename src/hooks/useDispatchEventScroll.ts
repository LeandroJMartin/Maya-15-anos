import { useCallback } from 'react';
import { useMenu } from '../context/menuContext';

function useDispatchEventScroll() {
  const { openMenu } = useMenu();

  const dispatch = useCallback(() => {
    const el =
      document.querySelector('.scroll-horizontal')?.firstElementChild || null;

    const width = el?.scrollWidth;

    const evt = new Event('wheel', { bubbles: true, cancelable: true });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    evt.deltaX = Math.floor(width);

    if (window.innerWidth > 999) {
      if (el) {
        openMenu(false);
        el.dispatchEvent(evt);
      }
    } else {
      const elContact = document.getElementById('contact') || null;

      if (elContact) {
        openMenu(false);
        elContact.scrollIntoView();
      }
    }
  }, [openMenu]);

  return { dispatch };
}

export default useDispatchEventScroll;
