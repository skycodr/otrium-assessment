import { createContext } from "react";
import { useFacets } from "../hooks";

import json from '../__data__/categories.json';

// Context Object
export const TreeContext = createContext<ITreeFacets<ICategory>>({
  dataSource: [],
  getFacets: (_facet) => [],
  setFacets: (_facet, _value) => [],
  removeFacets: (_facet) => { },
  commit: () => { }
});

// Context Provider
const TreeContextProvider = ({ children }: IChildren) => {
  const {
    dataSource,
    getFacets,
    setFacets,
    removeFacets,
    commit
  } = useFacets<ICategory>(json.data.categories);

  return (
    <TreeContext.Provider value={{ dataSource, getFacets, setFacets, removeFacets, commit }}>
      {children}
    </TreeContext.Provider>
  );
};

export default TreeContextProvider;