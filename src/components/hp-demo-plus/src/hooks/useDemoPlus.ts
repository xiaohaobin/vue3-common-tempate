import {
  computed,
  getCurrentInstance,
  nextTick,
  onUnmounted,
  reactive,
  ref,
  toRaw,
  unref,
  watch,
  watchEffect,
} from 'vue';
import { getDynamicProps } from '/@/utils/props';
import {
  DemoActionType,
  DemoPropsType,
  ReturnMethods,
  UseDemoReturnType,
  UseDemoInnerReturnType,
  ReturnInnerMethods,
} from '../types';
import { isEqual, isFunction } from 'lodash-es';

const dataTransFerRef = reactive({});
const visibleData = reactive<{ [key: number]: boolean }>({});

export function useDemoPlus(props?: DemoPropsType): UseDemoReturnType {
  // 组件实例
  const listRef = ref<Nullable<DemoActionType>>(null);
  // 组件uid
  const uid = ref<string>('');

  // 确保获取到组件实例
  function getDemo() {
    const list = unref(listRef);
    if (!list) {
      console.log('demo示例尚未获取，请确保在执行操作时已呈现demo！');
    }
    return list as DemoActionType;
  }

  // 注册组件
  function register(instance: DemoActionType, uuid: string) {
    // 确保性能
    onUnmounted(() => {
      listRef.value = null;
    });

    // 组件实例赋值
    listRef.value = instance;

    uid.value = uuid;

    // 声明赋值函数
    instance.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible;
    };

    watch(
      () => props,
      () => {
        // getDynamicProps函数可以把ref数据转为unref数据
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }

  // 组件暴露出去的方法
  const method: ReturnMethods = {
    setProps: async (props: Partial<DemoPropsType>) => {
      const demo = await getDemo();
      demo.setProps(props);
    },
    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)];
    }),
    openDialog: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getDemo()?.setProps({
        visible: visible,
        ...data,
      });
      if (!data) return;
      if (openOnSet) {
        // 重复赋值会为了避免原有数据的影响
        dataTransFerRef[unref(uid)] = null;
        dataTransFerRef[unref(uid)] = toRaw(data);
      }
      const equal = isEqual(toRaw(dataTransFerRef[unref(uid)]), toRaw(data));

      if (!equal) {
        dataTransFerRef[unref(uid)] = toRaw(data);
      }
    },
    closeDialog: () => {
      getDemo()?.setProps({ visible: false });
    },
  };

  return [register, method];
}

export function useDemoPlusInner(callbackFn?: Fn): UseDemoInnerReturnType {
  const dialogInstanceRef = ref<Nullable<DemoActionType>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<string>('');

  if (!getCurrentInstance()) {
    throw new Error('useDemoPlusInner()只能在setup或component内部使用！');
  }

  const getInstance = () => {
    const instance = unref(dialogInstanceRef);
    if (!instance) {
      console.log('useDemoPlusInner实例未创建！');
      return;
    }
    return instance;
  };

  const register = (instance: DemoActionType, uuid: string) => {
    uidRef.value = uuid;
    dialogInstanceRef.value = instance;
    // 与useDialog建立emit联系
    currentInstance?.emit('register', instance, uuid);
  };

  watchEffect(() => {
    const data = dataTransFerRef[unref(uidRef)];
    console.log(dataTransFerRef);

    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  const methods: ReturnInnerMethods = {
    getVisible: computed((): boolean => {
      return visibleData[~~unref(uidRef)];
    }),
    closeDialog: () => {
      getInstance()?.setProps({ visible: false });
    },
    setProps: (props: Partial<DemoPropsType>) => {
      getInstance()?.setProps(props);
    },
  };

  return [register, methods];
}
