import { createContext } from "react";
import { useFacets } from "../hooks";

import json from '../__data__/categories.json';

export const MenuContext = createContext<ITreeContext<ICategory>>({
  dataSource: [],
  getNodes: (_facet) => [],
  setNodes: (_facet, _value) => [],
  commit: () => { }
});

const MenuContextProvider = ({ children }: IChildren) => {
  const [
    dataSource,
    getNodes,
    setNodes,
    commit
  ] = useFacets<ICategory>(json.data.categories);

  return (
    <MenuContext.Provider value={{ dataSource, getNodes, setNodes, commit }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;