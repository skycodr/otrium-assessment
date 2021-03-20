type TFunction<T = {}, R = void> = (...param: T[]) => R;

type TTreeCheckboxChangeHandler<T extends ITreeData> = (
  data: T,
  checked: boolean,
) => void;

type TChangeEventHandler = React.ChangeEventHandler<HTMLInputElement>;

type TUseTree<T extends ITreeData> = {
  handleSelect: TTreeCheckboxChangeHandler;
  toggleSelectAll: TFunction<boolean>;
} & Pick<ITreeContext<T>, 'getNodes'>;

interface IChildren {
  children: ReactNode | ReactNode[] | ReactElement;
}

// Tree view requires this definition to operate smoothly
interface ITreeData {
  [key: string]: any;
  checked?: boolean;
}

interface ICategory extends ITreeData {
  id: string;
  count: number;
  parent: string;
  name: string;
}

// Tree context for the data to be bound to. The data type 'T'
// should extend ITreeData
interface ITreeContext<T extends ITreeData> {
  dataSource: T[];
  getNodes: TFunction<Partial<T>, T[]>;
  setNodes: (data: Partial<T>, value: Partial<T>) => T[];
  commit: TFunction;
}

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
  id: string,
  label: string;
  checked?: boolean;
  onChange?: TChangeEventHandler;
}
