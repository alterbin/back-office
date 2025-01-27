import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

const initialState = {
  create: false,
  delete: false,
  disable: false,
  edit: false,
  enable: false,
  activity: {} as { [key: string]: any },
  record: {} as { [key: string]: any },
  minimize: false,
  show: false,
  view: false,
  showIframe: false,
  title: '',
  watch: false,
};

type ModalsState = ReturnType<() => typeof initialState>;

export type SetModals = React.Dispatch<React.SetStateAction<ModalsState>>;

type DefaultValues = {
  modals: ModalsState;
  setModals: SetModals;
};

const ModalsContext = createContext<DefaultValues>({ modals: initialState, setModals: () => null });

const ModalsProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [modals, setModals] = useState(initialState);

  const state = { modals };

  const setState = { setModals };

  const value = useMemo(() => ({ modals, setModals }), [state, setState]);

  return (
    <ModalsContext.Provider value={value}>
      {children}
    </ModalsContext.Provider>
  );
};

const useModals = () => useContext(ModalsContext);

export { useModals, ModalsProvider };
