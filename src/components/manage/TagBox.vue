<template>
  <div class="tag-box">
    <div class="tag draggableTag" v-for="(tagItem,index) in tagsArr" :key="index+'-only'">{{ tagItem }}</div>
  </div>
</template>

<script>
import {tagsArr} from '@/mock/popup';

export default {
  name: "TagBox",
  data() {
    return {
      tagsArr: tagsArr
    }
  }
}
</script>

<style scoped lang="scss">
.tag-box {
  padding: 20px 10px;
  text-align: center;
  background-color: white;
  box-shadow: 0 3px 5px rgba(226, 226, 226, 82%);

  .draggableTag {
    cursor: grab;
    -webkit-user-drag: element;
    -webkit-user-select: none;
    user-select: none;
  }
}
</style>