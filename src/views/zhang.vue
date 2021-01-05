<template>
  <h1 @click="onFun">我是张</h1>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
export default defineComponent({
  name: "zhang",
  setup() {
    const { ctx }: any = getCurrentInstance();
    const onFun = () => {
      ctx.$mitt.emit("onfun", "我传古来了");
    };
    return {
      onFun,
    };
  },
});
</script>

<style lang="less" scope>
</style>