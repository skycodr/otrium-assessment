export const swallow = (..._props: unknown[]) => {};

/**
 * Generates a label from a given ICategory object.
 *
 * @param {ICategory} param ICategory data.
 * @returns {string} A label string.
 */
export const getCategoryLabel = ({ name, count }: ICategory): string =>
  `${name} (${count})`;

/**
 * Generate a key property for given ICategory object.
 *
 * @param {ICategory} param ICategory data.
 * @returns {string} A key for ICategory.
 */
export const getCategoryKey = ({ id, parent }: ICategory): string =>
  `${parent}_${id}`;

/**
 * Generate a facet to retrieve a children for a given node
 *
 * @param param ITreeData object
 * @returns
 */
export const getCategoryChildFacet = ({
  id,
}: ICategory): Partial<ICategory> => ({
  parent: id,
});

/**
 * Generate a facet for retrieving parent nodes
 * Todo: For future use
 *
 * @param param ITreeData object
 * @returns
 */
export const getCategoryParentFacet = ({
  parent,
}: ICategory): Partial<ICategory> => ({
  id: parent,
});

// We don't need _ for just this function
export const isEmpty = <T extends object>(value: T) =>
  !Object.keys(value).length;
