import React from "react";

const useToggle = (defaultValue = false) => {
  const [toggle, setToggle] = React.useState<boolean>(defaultValue);

  const toggleHandler = () => setToggle((prev: boolean) => !prev);

  return { toggle, toggleHandler };
};

export default useToggle;
