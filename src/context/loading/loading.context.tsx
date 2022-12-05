import { createContext, useState } from "react";

const LoadingContext = createContext({
  isOpen: false,
  show: () => {},
  hide: () => {},
});

export const LoadingContextProvider = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const show = () => {
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
  };

  return (
    <LoadingContext.Provider value={{ isOpen: isOpen, show: show, hide: hide }}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
