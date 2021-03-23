import { Checkbox, FormControlLabel, Grid, IconButton, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useContext } from 'react';
import { Leaf, Tree } from './components';
import { TreeContext } from './contexts';
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
  const {
    getFacets,
    handleSelect,
    handleDelete,
    toggleSelectAll
  } = useTree<ICategory>(useContext(TreeContext), getCategoryChildFacet);

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
          control={
            <Checkbox
              data-testid='selectAll'
              onChange={(e) => toggleSelectAll(e.target.checked)}
            />
          }
        />
        <IconButton aria-label="delete" onClick={handleDelete}>
          <Delete />
        </IconButton>
      </Grid>
      <Grid>
        <Tree<ICategory>
          data-testid='treeMenu'
          className={styles.treeStyle}
          root={{ parent: '0' }}
          sourceExtractor={getFacets}
          keyExtractor={getCategoryKey}
          rootExtractor={getCategoryChildFacet}
          // You may find branches are on the tree ;)
          render={(value: ICategory) => (
            <Leaf id={value.id} label={getCategoryLabel(value)} onChange={(e) => {
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
