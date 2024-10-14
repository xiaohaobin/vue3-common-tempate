<script setup lang="ts">
  import { computed, onMounted, ref, unref } from 'vue';
  import { DemoActionType, DemoPropsType } from './types';
  import { demoProps } from './props';
  import { deepMerge } from '/@/utils';

  const props = defineProps(demoProps);

  const emit = defineEmits(['register']);

  const propsRef = ref<Partial<DemoPropsType>>();

  const getProps = computed(() => {
    return { ...props, ...unref(propsRef) };
  });

  const setProps = (props: Partial<DemoPropsType>) => {
    // deepMerge函数可以把两份props合并
    propsRef.value = deepMerge(unref(propsRef) || {}, props);
  };

  const demoAction: DemoActionType = {
    setProps,
  };

  onMounted(() => {
    emit('register', demoAction);
  });
</script>

<template>
  <div>{{ getProps }}</div>
</template>
