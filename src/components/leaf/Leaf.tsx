import { Box, Checkbox } from "@material-ui/core";

/**
 * Component to render as the leaf node of a tree component
 * 
 * @param {ILeafProps} props Properties used for the leaf component
 * @returns JSX.Element
 */
const Leaf = ({ id, label, checked = false, onChange }: ILeafProps) => (
  <Box>
    <Checkbox
      data-testid={`treeItem_${id}`}
      onClick={(e) => e.stopPropagation()}
      onChange={(e, _checked) => onChange?.(e)}
      checked={checked}
    />
    {label}
  </Box>
);

export default Leaf;
