import { ComputedRef } from 'vue';

export interface DemoPropsType {
  // 入参1
  field1: string;
  // 入参2
  visible: boolean | undefined;
}

export interface DemoActionType {
  setProps: (prop: Partial<DemoPropsType>) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
}

export interface ReturnMethods extends DemoActionType {
  openDialog: <T = any>(visible?: boolean, data?: T, openOnSet?: boolean) => void;
  closeDialog: () => void;
  getVisible?: ComputedRef<boolean>;
}

export type RegisterFn = (instance: DemoActionType, uuid?: string) => void;

export type UseDemoReturnType = [RegisterFn, ReturnMethods];

export interface ReturnInnerMethods extends DemoActionType {
  getVisible?: ComputedRef<boolean>;
  closeDialog: () => void;
}

export type UseDemoInnerReturnType = [RegisterFn, ReturnInnerMethods];
