<template>
  <div class="bookmark-filter-content">
    <h1>书签管理器</h1>
    <div class="bookmark-filter-input">
      <div class="icon">
        <img src="@/assets/icon.png" alt="input-icon">
      </div>
      <input type="text" placeholder="搜索书签或标签" @input="darkSearchBookMark"
             v-model="searchInputVal"
      >
    </div>
  </div>
</template>

<script>
import {searchResult} from "@/mock/popup";
import Fuse from 'fuse.js';

export default {
  name: "BookMarkFilter",
  data() {
    return {
      // 全局的已收藏书签数组
      searchResult: searchResult,
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
     * @description 用于实现模糊搜索(参数是当前元素版本)
     */
    darkSearchBookMark() {
      this.fuseSearch();
      // 进行模糊搜索
      this.fuseResult = this.fuse.search(this.searchInputVal);
      // 调用父组件的 get 函数,用于获取该子组件输入框输入的的值
      this.$emit('getSearchInputVal', this.searchInputVal);
      // 如果模糊搜索结果大于 0, 调用父组件的 get 函数,用于获取该子组件模糊搜索的结果
      if (this.fuseResult.length > 0) {
        this.$emit('getFuseResult', this.fuseResult);
      }
      // 调用父组件的 get 函数,用于计算模糊搜索之后那些书签可见那些书签不可见
      this.$emit('getVisibleBookMarkObj');
      // 调用父组件函数, 将模糊搜索结果的 item 值合并成一个数组
      this.$emit('fuseJsResultDisplay');
    },
    /**
     * @description 用于 fuse.Js 初始化
     */
    fuseSearch() {
      const options = {
        includeScore: true,
        // 用 `title` 和 `tags` 作为模糊搜索的索引
        keys: ['title', 'tags']
      }
      this.fuse = new Fuse(this.searchResult, options)
    }
  },
  mounted() {
    // 加载时就先调用 fuseJs
    this.fuseSearch();
  }
}
</script>

<style scoped lang="scss">
.bookmark-filter-content {
  width: 60%;
  margin: 90px auto;

  h1 {
    text-align: center;
    color: white;
    font-weight: 300;
    font-size: 30px;
    margin-bottom: 30px;
    text-shadow: 1px 2px 8px #674611;
  }

  .bookmark-filter-input {
    transition: all .5s;
    display: flex;
    justify-content: center;
    height: 50px;
    padding: 0 20px;
    background-color: rgba(255, 255, 255, 0.94);
    box-shadow: 2px 2px 10px #e38c00;
    border-radius: 50px;

    &:hover {
      box-shadow: 8px 8px 12px rgba(0, 0, 0, .3);
    }
  }

  .icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 25px;
    height: 50px;
    margin-right: 10px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  input {
    font-size: 15px;
    margin-right: 15px;
    min-width: 100px;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
  }
}


</style>