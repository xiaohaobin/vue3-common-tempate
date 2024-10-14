import { nextTick, onUnmounted, ref, unref, watch } from 'vue';
import { getDynamicProps } from '/@/utils/props';
import { DemoActionType, DemoPropsType, UseDemoReturnType } from '../types';

export function useDemo(props: DemoPropsType): UseDemoReturnType {
  // 组件实例
  const listRef = ref<Nullable<DemoActionType>>(null);

  // 确保获取到组件实例
  async function getDemo() {
    const list = unref(listRef);
    if (!list) {
      console.log('demo示例尚未获取，请确保在执行操作时已呈现demo！');
    }
    await nextTick();
    return list as DemoActionType;
  }

  // 注册组件
  function register(instance: DemoActionType) {
    // 确保性能
    onUnmounted(() => {
      listRef.value = null;
    });

    // 组件实例赋值
    listRef.value = instance;

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
  const method: DemoActionType = {
    setProps: async (props: Partial<DemoPropsType>) => {
      const demo = await getDemo();
      demo.setProps(props);
    },
  };

  return [register, method];
}
