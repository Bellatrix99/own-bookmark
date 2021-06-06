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
      // 用于模糊搜索的"标志"(书签的标题和标签合并的一维数组)
      darkSearchSymbol: [],
      // 用于循环语句,从而得到当前数组循环的次数和数组下标
      arrIndex: 0,
      // 可见的书签下标数组
      visibleBookMarkIndex: [],
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
      console.log('123');
      this.fuseResult = this.fuse.search(this.searchInputVal);
      this.$emit('getSearchInputVal', this.searchInputVal);
      if (this.fuseResult.length > 0) {
        this.$emit('getFuseResult', this.fuseResult);
      }
      this.$emit('getVisibleBookMarkObj');
      this.$emit('fuseJsResultDisplay');
    },
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