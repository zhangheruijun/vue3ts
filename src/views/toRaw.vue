<template>
  <div @click="reactiveFun">reactive中获取原始数据</div>
  <div @click="refFun">ref中获取原始数据</div>
</template>
<script lang='ts'>
import { defineComponent, ref, reactive, toRaw } from "vue";
export default defineComponent({
  name: "toRaw",
  setup() {
    // -----------------------------------------reactive中获取原始数据------------------------------------------
    const obj = { name: "jack", age: 18 };
    const state = reactive(obj);
    const yuanData = toRaw(state); //本质就是获取该响应数据的原始数据,本例中是是获取state的原始数据也就是obj
    const reactiveFun = () => {
      obj.name = "tom";
      console.log(obj); // {name: "tom", age: 18}
      console.log(yuanData); // {name: "tom", age: 18}
      console.log(state); //Proxy{name: "tom", age: 18}
    };
    // -----------------------------------------ref中获取原始数据------------------------------------------
    const a = { sex: "男" };
    const refState = ref(a);
    const refData = toRaw(refState.value); //ref获取原始数据要加.value
    const refFun = () => {
      a.sex = "女";
      console.log(a); //{sex: "女"}
      console.log(refData); //{sex: "女"}
      console.log(refState); //RefImpl{_rawValue: {…}, _shallow: false, __v_isRef: true, _value: Proxy}
    };
    return { reactiveFun, refFun };
  },
});
</script>