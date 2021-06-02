<template>
  <div class="tag-box">
    <div class="search-tag-input-outer">
      <input type="text" id="searchTagInput" @input="searchTag">
    </div>
    <div class="tag draggableTag" v-for="(tagItem,index) in searchTagArr" :key="index+'-only'">
      {{ tagItem }}
    </div>
  </div>
</template>

<script>
import {tagsArr} from '@/mock/popup';

export default {
  name: "TagBox",
  mounted() {
    this.searchTagArr = tagsArr;
  },
  data() {
    return {
      tagsArr: tagsArr,
      searchTagArr: []
    }
  },
  methods: {
    searchTag(e) {
      this.searchTagArr = [];
      for (const tag of this.tagsArr) {
        if (tag.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
          this.searchTagArr.push(tag);
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.tag-box {
  padding: 10px;
  text-align: center;
  background-color: white;
  box-shadow: 0 3px 5px rgba(226, 226, 226, 82%);
  border-radius: 14px;

  .search-tag-input-outer {
    border: 1px solid #b4b1b1;
    border-radius: 12px;
    height: 30px;

    input {
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