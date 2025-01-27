import { ReactNode, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { useOutsideClick } from '../../hooks';

const ModalBackdrop = ({ children, duration, state }: any) => {
  const defaultStyle = {
    transition: `background-color ${duration}ms ease-in-out, z-index ${duration}ms ease-in-out`,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: -10,
  };

  const transitionStyles: any = {
    entering: { backgroundColor: 'rgba(0, 0, 0, 0)', zIndex: -10 },
    entered: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 },
  };
  return (
    <div
      className="app__drawer__modal_backdrop"
      style={{
        ...defaultStyle,
        ...transitionStyles[state],
      }}
    >
      {children}
    </div>
  );
};

const Sidebar = ({
  children, duration, state, handleClose,
}: any) => {
  const [ref] = useOutsideClick(handleClose);

  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: 'translateX(-101%)',
  };

  const transitionStyles: any = {
    entering: { transform: 'translateX(-101%)' },
    entered: { transform: 'translateX(0)' },
  };
  return (
    <div
      className="app__drawer__sidebar modal-md"
      ref={ref}
      style={{
        ...defaultStyle,
        ...transitionStyles[state],
      }}
    >
      {children}
    </div>
  );
};

const duration = 250;

interface IDrawer {
  children: ReactNode;
  show: boolean;
  handleClose: () => void;
}

export default function Drawer(props: IDrawer) {
  const { children, show, handleClose } = props;

  const nodeRef = useRef(null);

  return (
    <Transition in={show} timeout={duration} nodeRef={nodeRef}>
      {(state) => (
        <ModalBackdrop duration={duration} state={state}>
          <Sidebar duration={duration} state={state} handleClose={handleClose}>
            {show && (children)}
          </Sidebar>
        </ModalBackdrop>
      )}
    </Transition>
  );
}
