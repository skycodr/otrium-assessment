import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from "@material-ui/lab";

/**
 * A recursive component which will render nested
 * items for the tree.
 * 
 * @param props {IBranchProps}
 * @returns JSX.Element
 */
const Branch = <T extends ITreeData>(props: IBranchProps<T>) => {
  const {
    root,
    rootData,
    keyExtractor,
    rootExtractor,
    sourceExtractor,
    render
  } = props;

  return (
    <TreeItem nodeId={rootData.id} label={render(rootData)} >
      {
        (sourceExtractor?.(root) ?? []).map(datum =>
          <Branch<T>
            key={keyExtractor(datum)}
            {...{ ...props, root: rootExtractor(datum), rootData: datum }}
          />
        )
      }
    </TreeItem >
  );
};

/**
 * Tree component.
 *
 * @param props {ITreeData} ITreeData value.
 * @returns JSX.Element.
 */
const Tree = <T extends ITreeData>(props: ITreeProps<T>) => {

  const {
    root,
    keyExtractor,
    rootExtractor,
    sourceExtractor,
    className
  } = props;

  return (
    <TreeView
      className={className}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {
        (sourceExtractor?.(root) ?? []).map((datum) =>
          <Branch<T>
            key={keyExtractor(datum)}
            {...{ ...props, root: rootExtractor(datum), rootData: datum }}
          />
        )
      }
    </TreeView>
  );

}

export default Tree;
