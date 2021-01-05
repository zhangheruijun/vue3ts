<template>
  <ul @click="reactFun">
    <li>shallowReactive</li>
    <li>{{ reactiveState.name }}</li>
    <li>{{ reactiveState.list.status }}</li>
    <li>{{ reactiveState.list.content.text }}</li>
  </ul>
  <div>4544</div>
  <ul @click="reactFunRef">
    <li>shallowRef</li>
    <li>{{ refContent.name }}</li>
    <li>{{ refContent.list.status }}</li>
    <li>{{ refContent.list.content.text }}</li>
  </ul>
  <div>{{ dataInject }}</div>
</template>
<script lang='ts'>
import {
  defineComponent,
  shallowRef,
  shallowReactive,
  triggerRef,
  inject,
} from "vue";
/*
shallowRef,shallowReactive都是都是递归监听;非递归监听是用于深层数据的响应带来的性能优化，不用每层都去创建Proxy一般用在数据多、层次深的时候用
1.shallowReactive：监听的是shallowReactive(10)->shallowReactive({value:10});只监听.value变化,value才是第一层,当第一层变化后子层才会变化
2.shallowRef:监听的是.value的变化,要直接真个改变;如果只想改变么某一层的的数据,就得引入triggerRef;真个只能提供shallowRef的方法
*/
export default defineComponent({
  name: "shallowReactive_shallowRef",
  props: {
    modelValue: String,
  },
  // emits: ["asd"],
  setup() {
    //inject的用法
    const dataInject = inject("pcd");
    //----------------------------------------shallowReactive------------------------------------------
    const reactiveState = shallowReactive({
      name: "张三",
      list: {
        status: false,
        content: {
          text: "内容",
        },
      },
    });
    const reactFun = () => {
      reactiveState.name = "李四"; //只当第一层发生改变时,才更新视图，那么子集层就会更新
      reactiveState.list.status = true;
      reactiveState.list.content.text = "内容改变了";
      console.log(reactiveState); //Proxy{name: "李四", list: {…}};只有这一层才会有Proxy
      console.log(reactiveState.list); //{status: true, content: {…}}
      console.log(reactiveState.list.content); //{text: "内容改变了"}
    };
    //----------------------------------------shallowRef------------------------------------------
    const refContent = shallowRef({
      name: "李四",
      list: {
        status: false,
        content: {
          text: "内容李世荣",
        },
      },
    });
    const reactFunRef = () => {
      refContent.value.list.status = true;
      triggerRef(refContent); //triggerRef做深层的改变;
      //或者做整个重新渲染;reactFunRef.value = {...}
      // refContent.value = {
      //   name: "张三",
      //   list: {
      //     status: true,
      //     content: {
      //       text: "内容",
      //     },
      //   },
      // };
    };
    return {
      reactiveState,
      reactFun,
      refContent,
      reactFunRef,
      dataInject,
    };
  },
});
</script>