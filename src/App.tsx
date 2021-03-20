import { Checkbox, FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import { useContext } from 'react';
import { Leaf, Tree } from './components';
import { TreeMenuContext } from './contexts';
import { useTree } from './hooks';
import { getCategoryKey, getCategoryLabel, getCategoryChildFacet } from './utils';

const useTreeStyles = makeStyles({
  treeStyle: {
    flexGrow: 1,
    maxWidth: 400,
  },
});


const App = () => {

  const styles = useTreeStyles();
  const { getNodes, handleSelect, toggleSelectAll } = useTree<ICategory>(
    useContext(TreeMenuContext), 
    getCategoryChildFacet);

  /**
   * Special Note:
   * 
   * If you want to get all selected categories. Simply write,
   *  getNodes({checked: true});
   */

  /*
   * Dev Note:
   *
   *  I have written some confusing logic on purpose. :D. Normally wouldn't do this
   *  on a project. Such as, bunching up things together without first using variables etc.
   */

  return (
    <Grid direction='column' container>
      <Grid>
        <FormControlLabel 
          label='Toggle select all' 
          control={<Checkbox onChange={(e) => toggleSelectAll(e.target.checked)} />} />
      </Grid>
      <Grid>
        <Tree<ICategory>
          className={styles.treeStyle}
          root={{ parent: '0' }}
          sourceExtractor={getNodes}
          keyExtractor={getCategoryKey}
          rootExtractor={getCategoryChildFacet}
          // You may find branches are on the tree ;)
          render={(value: ICategory) => (
            <Leaf label={getCategoryLabel(value)} onChange={(e) => {
              e.stopPropagation();
              handleSelect(value, e.target.checked);
            }} checked={!!value.checked} />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default App;
