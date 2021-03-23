import { useRef, useState } from 'react';
import { isEmpty } from '../utils';

/**
 * Match a given ITreeData object with facet ITreeData object and return
 * true or false
 *
 * @param data ITreeData object that needs to be compared with teh facet
 * @param facet ITreeData object that
 * @returns True or false if exact match is found
 */
const matcher = <T extends ITreeData>(data: T, facet: Partial<T>) => {
  // Todo: Performance deterrent. Move to calling function
  const entries = Object.entries(facet);

  let isMatch = true;

  /*
   * Get all key, value pairs in the facet. Check if every key value is a
   * match in data if so return true. Even on a single property mismatch
   * break from loop.
   */
  for (const [key, value] of entries) {
    // Dev Note: isMatch &&= data[key] === value seem to crash.
    isMatch = isMatch && data[key] === value;

    if (!isMatch) {
      break;
    }
  }

  return isMatch;
};

/**
 * A custom hook to manipulate object facets in an array.
 * Allows get/set properties of an ITreeData object
 *
 * @param {ITreeData[]} sourceData A flat array of ITreeData objects
 * @returns {ITreeFacets}
 */
const useFacets = <T extends ITreeData>(sourceData: T[]): ITreeFacets<T> => {
  const [dataSource, setSource] = useState<T[]>(sourceData);
  const commitSource = useRef<T[] | undefined>();

  /**
   * Get matching facet data from the source
   *
   * @param {ITreeData} facet Object to lookup the source
   * @returns
   */
  const getFacets = (facet: Partial<T>) =>
    (commitSource.current ?? dataSource).filter((data) =>
      matcher<T>(data, facet),
    );

  /**
   * Set properties of a given object for a given facet
   *
   * @param {ITreeData} facet Partial facet object lookup the source
   * @param {ITreeData} values Partial value facet object to be set in  on matching facets
   *
   * @returns Matching nodes
   */
  const setFacets = (facet: Partial<T>, values: Partial<T>) => {
    // If a commit source is available use the commit source.
    // Else use the source as the mapped source.
    const matchingSource: T[] = [];

    // If facets are not available. Assume all values
    // needs to be updated.
    const updateAll = isEmpty(facet);

    commitSource.current = (commitSource.current ?? dataSource).map((value) => {
      let node = { ...value };
      if (updateAll || matcher<T>(value, facet)) {
        node = { ...node, ...values };
        matchingSource.push(node);
      }

      return node;
    });

    return matchingSource;
  };

  const removeFacets = (facet: Partial<T>) => {
    commitSource.current = (commitSource.current ?? dataSource).filter(
      (value) => !matcher<T>(value, facet),
    );
  };

  /**
   * Commit any updates to the source data. This act as a
   * batch update. This was introduced for performance reasons.
   */
  const commit = () => {
    if (!!commitSource.current) {
      const mappedSource = [...commitSource.current];
      commitSource.current = undefined;
      setSource(mappedSource);
    }
  };

  return {
    dataSource,
    getFacets,
    setFacets,
    removeFacets,
    commit,
  };
};

export default useFacets;
