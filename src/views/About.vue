<script setup lang="ts">
  import { useDemoPlus } from '/@/components/hp-demo-plus';
  import DemoPlus from './DemoPlus.vue';
  // import { BasicDemo, useDemo } from '/@/components/hp-demo';

  // const [register, { setProps }] = useDemo({
  //   field1: '示例数据',
  // });
  const [DemoPlusRegister, { openDialog }] = useDemoPlus();
</script>

<template>
  <div>
    <!-- <span @click="setProps({ field1: '修改后数据1' })">点击修改参数1</span>
    <span @click="setProps({ field1: '修改后数据2' })">点击修改参数2</span> -->
    <span @click="openDialog(true, { field1: '父页面传递过去的数据' })">点击修改plus3</span>
    <!-- <BasicDemo @register="register" /> -->
    <DemoPlus @register="DemoPlusRegister" />
  </div>
</template>
