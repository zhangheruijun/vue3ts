<template>
  <div @mouseup="fun" @mousedown="funStart">{{ customContent }}</div>
  <div class="last-a">
    <p :draggable="true" @dragstart="drag" id="drag1">拖动我</p>
  </div>
  <dropModel class="last" id="div1" @drop.prevent="dropss" @dragover.prevent />
</template>
<script lang='ts'>
import { defineComponent, customRef } from "vue";
import dropModel from "@/components/drop.vue";
//自定义ref，可以用于异步
function customFun(value: any) {
  return customRef((track, trigger) => {
    return {
      get() {
        track(); //告诉vue这个数据是要追踪的
        return value;
      },
      set(newValue) {
        value = newValue;
        trigger(); //告诉vue出发界面更新
      },
    };
  });
}
export default defineComponent({
  components: { dropModel },
  setup() {
    const customContent = customFun(10);
    const funStart = () => {
      console.log("开始");
      customContent.value = 1;
    };
    const fun = () => {
      console.log("结束");
      customContent.value = 10;
    };
    const drag = (ev: any) => {
      // console.log(ev);
      ev.dataTransfer.setData("Text", ev.target.id);
    };
    // const allowDrop = () => {
    //   // e.preventDefault();
    //   console.log("sdf");
    // };
    const dropss = (ev: any) => {
      // ev.preventDefault();
      console.log("阿斯顿撒多");

      const data = ev.dataTransfer.getData("Text");
      // ev.target.appendChild(document.getElementById(data));
    };
    return { customContent, fun, funStart, drag, dropss };
  },
});
</script>
<style scoped>
.last-a {
  width: 300px;
  height: 200px;
  border: 1px solid red;
  margin: 20px;
}
.last {
  width: 300px;
  height: 200px;
  border: 1px solid blue;
}
</style>