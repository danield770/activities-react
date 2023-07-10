import { createPortal } from 'react-dom';
import { CgCloseO } from 'react-icons/cg';
import VisuallyHidden from './VisuallyHidden';
import { Link } from 'react-router-dom';

function Modal({ title, version, children }) {
  const url = version === 2 ? '/v2' : '/';
  return createPortal(
    <div className='modal-wrapper'>
      <div className='modal-backdrop' />
      <div
        className='dialog'
        role='dialog'
        aria-modal='true'
        aria-label={title}
      >
        <Link to={url} className='modal-close'>
          <CgCloseO size='28' />
          <VisuallyHidden>
            Close modal and return to activities page
          </VisuallyHidden>
        </Link>
        {children}
      </div>
    </div>,

    document.querySelector('#modal-root')
  );
}

export default Modal;
