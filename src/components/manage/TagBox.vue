<template>
  <div class="tag-box">
    <div class="search-tag-input-outer">
      <input type="text" id="searchTagInput" @input="searchTag" v-model="searchInputValue">
    </div>
    <transition-group
        name="tag-transition"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="in-out"
    >
      <div class="tag draggableTag" v-for="(tagItem,index) in searchTagArr" :key="index+'-only'">
        {{ tagItem }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import {tagsArr} from '@/mock/popup';

export default {
  name: "TagBox",
  mounted() {
    // 默认搜索结果为全局的的已定义标签数组 tagsArr
    this.searchTagArr = tagsArr;
  },
  data() {
    return {
      // 全局的已定义标签数组 tagsArr
      tagsArr: tagsArr,
      // 搜索标签结果数组
      searchTagArr: [],
      // 搜索框输入的值
      searchInputValue: ""
    }
  },
  methods: {
    /**
     * @description 用于监听搜索框输入, 返回模糊搜索结果(忽略大小写)
     */
    searchTag() {
      // 初始化搜索结果为空
      this.searchTagArr = [];
      for (const tag of this.tagsArr) {
        // 如果已定义的标签数组中某一项包含当前输入的值,则将该项推到模糊搜索结果数组中(忽略大小写)
        if (tag.toLowerCase().indexOf(this.searchInputValue.toLowerCase()) !== -1) {
          this.searchTagArr.push(tag);
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.animate__fadeIn {
  animation-duration: 0.6s;
}

.animate__fadeOut {
  animation-duration: 0.3s;
}

.tag-box {
  padding: 10px;
  //text-align: center;
  background-color: white;
  box-shadow: 0 3px 5px rgba(226, 226, 226, 82%);
  border-radius: 14px;
  transition: all 1s;

  .search-tag-input-outer {
    border: 1px solid #b4b1b1;
    border-radius: 12px;
    height: 30px;

    input {
      margin-left: 10px;
      font-size: 14px;
      min-width: 100px;
      width: 90%;
      height: 100%;
      border: none;
      background-color: transparent;
    }
  }


  .draggableTag {
    cursor: grab;
    -webkit-user-drag: element;
    -webkit-user-select: none;
    user-select: none;
  }
}
</style>