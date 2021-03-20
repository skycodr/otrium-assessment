/**
 * Custom hook provide the Tree with accompanying methods and data.
 *
 * Dev Note:
 *  This solution in not as generic as I would like it to be. As the hook
 *  is coupled to the context API. Ideally, I would pass required methods
 *  to deal with the necessities and have a wrapper to inject data so it is
 *  generic enough to handle all sort of scenarios.
 *
 * @param {ITreeContext} context ITreeContext object which is the data source
 * @param childFacetExtractor
 * @returns
 */
const useTree = <T extends ITreeData>(
  context: ITreeContext<T>,
  childFacetExtractor: TFunction<T, Partial<T>>,
): TUseTree<T> => {
  const { getNodes, setNodes, commit } = context;

  /*
   * Handle checkbox change event. Create the value to set, update current node
   * and descendant nodes with the value and commit changes.
   *
   * Todo:
   *  Find the ancestors and move to indeterminate sate if necessary. This should
   *  be a conditional state. I.e: if the parent node is selected and at least one
   *  of its descendant is unselected it should move to this state. This should be
   *  a bit process intensive as each ancestral node's descendant node needs to be
   *  traversed.
   */

  const handleSelect: TTreeCheckboxChangeHandler<T> = (datum: T, checked) => {
    const value = { checked } as Partial<T>;

    const setNodeSelection = (node: T) => {
      setNodes(node, value);
      setNodes(childFacetExtractor(node), value).forEach((childNode) =>
        setNodeSelection(childNode),
      );
    };

    setNodeSelection(datum);

    commit();
  };

  const toggleSelectAll = (checked: boolean) => {
    setNodes({}, { checked } as Partial<T>);
    commit();
  };

  return {
    handleSelect,
    toggleSelectAll,
    getNodes,
  };
};

export default useTree;
