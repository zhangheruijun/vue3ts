<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- v-model:msg="testValue" 类似2.0中的 :msg.sync='testValue';而且可以添加多个 -->
    <HelloWorld
      v-model:msg="testValue"
      v-model:msgn="testValue"
      @par-hand="handFun"
    />
    {{ num }}
    <div @click="btnFun">三大发顺丰</div>
    <div>{{ age }}------{{ dataList }}</div>
    <input v-model="changsText" type="text" name id />
    <div>{{ shallReact._a }}</div>
    <div>{{ shallReact.a._b }}</div>
    <div>{{ shallReact.a.b.d }}</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  computed,
  onMounted,
  toRefs,
  isRef,
} from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  //setup只能是一个同步的函数，不能是异步的函数,所以setup前面不能加async
  setup(props, context) {
    onMounted(() => {
      console.log("生命周期的mounted");
    });
    const changsText = ref("双向绑定");
    const num = ref(20); //数组、对象、字符串个都可以
    console.log(isRef(num)); //isRef来判断是不是ref
    const zhang: any = reactive({
      //要重新赋值界面才能更新
      age: 18,
      name: "周杰伦",
      dataList: computed(() => zhang.age + 3),
      testValue: "测试watchEffect",
    });
    const btnFun = () => {
      zhang.age = 545;
      zhang.name = "天王";
      num.value = 50;
      zhang.testValue = "我靠变了";
    };
    const handFun = (con: string) => {
      console.log(con);
    };
    watch(
      //监听多个属性
      [() => zhang.age, () => zhang.name, changsText],
      (
        [newValue, newName, changsTextNew],
        [oldValue, oldName, changsTextOld]
      ) => {
        console.log(
          newValue,
          newName,
          changsTextNew,
          oldValue,
          oldName,
          changsTextOld
        );
      },
      {
        immediate: true,
        deep: true,
      }
    );
    return {
      num,
      btnFun,
      handFun,
      changsText,
      ...toRefs(zhang), //reactive的数据是响应式的，但是用解构运算符的就不是响应式的，必须用toRefs()转化
    };
  },
});
</script>
