<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { getListInfo } from '../api/demo';

  const res = ref();

  const demoParams = reactive({
    field1: 'field1',
    field2: 'field2',
  });

  async function getInfo() {
    const data = await getListInfo(demoParams);
    res.value = data;
  }

  onMounted(() => {
    getInfo();
  });
</script>

<template>
  <div class="xhb-basic-help">
    <b class="jc-icon-my-fanqizha">mock数据：</b>
    <p>
      {{ res }}
    </p>
  </div>
</template>

<style lang="scss">
  $prefix-cls: '#{$namespace}-basic-help';

  .#{$prefix-cls} {
    background: red;

    &:hover {
      background: green;
    }

    &__wrap {
      p {
        margin: 0;
        font-weight: bolder;
      }
    }
  }
</style>
