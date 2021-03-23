type TFunction<T = {}, R = void> = (...param: T[]) => R;

type TTreeCheckboxChangeHandler<T extends ITreeData> = (
  data: T,
  checked: boolean,
) => void;

type TChangeEventHandler = React.ChangeEventHandler<HTMLInputElement>;

interface IChildren {
  children: ReactNode | ReactNode[] | ReactElement;
}

// Tree view requires this definition to operate smoothly
interface ITreeData {
  [key: string]: any;
  checked?: boolean;
}

interface ITreeFacets<T extends ITreeData> {
  dataSource: T[];
  getFacets: TFunction<Partial<T>, T[]>;
  setFacets: (data: Partial<T>, value: Partial<T>) => T[];
  removeFacets: TFunction<Partial<T>>;
  commit: TFunction;
}

type TUseTree<T extends ITreeData> = {
  handleSelect: TTreeCheckboxChangeHandler;
  handleDelete: TFunction;
  toggleSelectAll: TFunction<boolean>;
} & Pick<ITreeFacets<T>, 'getFacets'>;

interface ITreeProps<T> {
  root: Partial<T>;
  keyExtractor: TFunction<T, string>;
  rootExtractor: TFunction<T, Partial<T>>;
  sourceExtractor?: TFunction<Partial<T>, T[]>;
  render: TFunction<T, JSX.Element>;
  className?: string;
}

interface IBranchProps<T extends ITreeData> extends ITreeProps<T> {
  rootData: T;
}

interface ILeafProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: TChangeEventHandler;
}

interface ICategory extends ITreeData {
  id: string;
  count: number;
  parent: string;
  name: string;
}
