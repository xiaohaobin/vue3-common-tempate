<script setup lang="ts">
  import { computed, getCurrentInstance, nextTick, ref, unref, watch } from 'vue';
  import { DemoActionType, DemoPropsType } from './types';
  import { demoProps } from './props';
  import { deepMerge } from '/@/utils';

  const props = defineProps(demoProps);

  const emit = defineEmits(['register', 'visible-change']);

  const propsRef = ref<Partial<DemoPropsType>>();
  const visibleRef = ref<boolean>(false);

  const instance = getCurrentInstance();

  const getMergeProps = computed(() => {
    return { ...props, ...unref(propsRef) };
  });

  const getProps = computed(() => {
    const opt = {
      ...unref(getMergeProps),
      visible: unref(visibleRef),
    };
    return opt as DemoPropsType;
  });

  const setProps = (props: Partial<DemoPropsType>) => {
    // deepMerge函数可以把两份props合并
    propsRef.value = deepMerge(unref(propsRef) || {}, props);
    if (Reflect.has(props, 'visible')) {
      visibleRef.value = !!props.visible;
    }
  };

  const demoAction: DemoActionType = {
    setProps,
    emitVisible: undefined,
  };

  instance && emit('register', demoAction, instance.uid);

  watch(
    () => props.visible,
    (newVal, oldVal) => {
      if (newVal !== oldVal) visibleRef.value = newVal;
    },
  );

  watch(
    () => visibleRef.value,
    (v) => {
      nextTick(() => {
        emit('visible-change', v);
        instance && demoAction.emitVisible?.(v, instance.uid);
      });
    },
  );
</script>

<template>
  <div>{{ getProps }}</div>
</template>
