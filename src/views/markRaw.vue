<template>
  <div @click="fun">{{ reactiveCon.name }}</div>
</template>
<script lang='ts'>
import { defineComponent, reactive, markRaw } from "vue";
export default defineComponent({
  name: "markRaw",
  setup() {
    const obj = markRaw({ name: "markRaw" });
    const reactiveCon = reactive(obj);
    const fun = () => {
      reactiveCon.name = "阻止响应;不被追踪";
      console.log(reactiveCon);
      console.log(obj);
    };
    return { reactiveCon, fun };
  },
});
</script>
