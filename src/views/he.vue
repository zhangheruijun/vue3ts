<template>
  <h1 @click="closeFun">我是何</h1>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted } from "vue";
export default defineComponent({
  name: "he",
  setup() {
    const { ctx }: any = getCurrentInstance();
    onMounted(() => {
      ctx.$mitt.on("onfun", (data: string) => {
        console.log(data);
      });
    });
    // function clearFun(data: string) {
    //   console.log(data);
    // }
    const closeFun = () => {
      //清除所有监听
      ctx.$mitt.all.clear();
    };
    return {
      closeFun,
      // clearFun,
    };
  },
});
</script>
<style lang="less" scope>
</style>