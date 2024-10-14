export interface DemoPropsType {
  // 入参1
  field1: string;
}

export interface DemoActionType {
  setProps: (prop: Partial<DemoPropsType>) => void;
}

export type RegisterFn = (instance: DemoActionType) => void;

export type UseDemoReturnType = [RegisterFn, DemoActionType];
