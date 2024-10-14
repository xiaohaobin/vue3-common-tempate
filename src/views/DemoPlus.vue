<script setup lang="ts">
  import { BasicDemoPlus, useDemoPlusInner } from '../components/hp-demo-plus';
  const [register] = useDemoPlusInner((data) => {
    console.log(data);
  });
</script>

<template>
  <div>
    <BasicDemoPlus @register="register" />
  </div>
</template>
