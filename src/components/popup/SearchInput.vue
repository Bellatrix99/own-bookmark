<template>
  <div class="search-box-outer">
    <div class="search-box" @click="handleToggleExpand">
      <label>
        <input type="text" id="search" name="search" placeholder="搜索标签或书签" autocomplete="off"
               v-model="searchInputVal" @blur="clearSearchInput" @input="darkSearchBookMark">
      </label>
      <transition
          name="cancel-button"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
      >
        <a id="search-input-operate-btn" v-show="expanded" @click="handleToggleExpand">取消</a>
      </transition>
    </div>
  </div>
</template>

<script>
import {searchResult} from "@/mock/popup";
import Fuse from "fuse.js";
import {darkSearchBookMark} from "@/utils/Globle";

export default {
  name: "SearchInput",
  data() {
    return {
      // 全局的已收藏书签数组
      searchResult: searchResult,
      // 搜索框是否展开的状态布尔值
      expanded: false,
      // 搜索框输入框的值
      searchInputVal: "",
      // fuseJs 模糊搜索
      fuse: "",
      // fuseJs 模糊搜索结果
      fuseResult: [],
    }
  },

  methods: {
    /**
     * @description 用于监听当前元素的点击事件,
     * 并且传递搜索框是否展开的状态布尔值
     * @param {Object} event
     */
    handleToggleExpand(event) {
      // 如果点击的元素是 Input 标签,则展开状态布尔值为"真"
      this.expanded = event.target.tagName === 'INPUT';
      // 子组件可以使用 $emit 触发父组件的自定义事件
      // 第二参数是传给父组件的值
      // 父组件监听事件时，可以通过 $event 访问这个被抛出的值
      this.$emit('toggleExpand', {
        expanded: this.expanded
      });
    },
    /**
     * @description input 输入框失去焦点时清除输入框内容
     */
    clearSearchInput() {
      this.searchInputVal = "";
    },
    /**
     * @description 用于进行模糊搜索
     */
    darkSearchBookMark() {
      darkSearchBookMark(this)
    },
    /**
     * @description 用于 fuse.Js 初始化
     */
    fuseSearch() {
      const options = {
        includeScore: true,
        // Search in `title` and in `tags` array
        keys: ['title', 'tags']
      }
      this.fuse = new Fuse(this.searchResult, options)
    }
  },
  mounted() {
    // 加载时就先初始化 fuseJs
    this.fuseSearch();
  },
}
</script>

<style scoped lang="scss">
.animate__fadeIn,
.animate__fadeOut {
  animation-duration: 0.5s;
}

.search-box-outer {
  position: relative;
  z-index: 9999;
}

.search-box {
  display: flex;
  align-items: center;
  width: 70%;
  margin: auto;
  height: var(--search-height);
  border-radius: 20px;
  padding: 0 var(--search-input-left-padding);
  background-color: #e9e9e9;

  label {
    flex-grow: 1;
  }

  input {
    width: 100%;
    height: 100%;
    margin-left: calc(50% - 4em - var(--search-input-left-padding) / 2 + var(--search-input-cancel-width));
    line-height: var(--search-height);
    border: none;
    outline: none;
    background-color: transparent;
    transition: all .3s;

    &:focus {
      margin-left: 0;
    }
  }

  #search-input-operate-btn {
    margin-left: -28px;
    line-height: 40px;
    font-size: 14px;
    color: #757575;
    cursor: pointer;
  }

}
</style>