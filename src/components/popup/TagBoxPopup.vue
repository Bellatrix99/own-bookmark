<template>
  <div class="tag-outer">
    <div class="tag" v-for="(tag,index) in searchResultNew.tags"
         :key="index + '-only'" @mouseenter="showMoreTags(index)"
         ref="eachTag" :title="moreTags"
    >
      {{ tag }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TagBox-popup",
  props: {
    // 深拷贝之后的"已收藏列表的单个项"
    searchResultNew: {
      type: Object,
      default: () => ({})
    },
    // 已收藏列表的单个项
    searchResultObj: {
      type: Object,
      default: () => ({})
    },
    // 当前 tag 显示数量
    tagNumbers: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 因为过长而未能直接显示的 tags 数组
      moreTags: [],
    }
  },
  methods: {
    /**
     * @description 用于显示省略的 tags 数组
     * @param {Number} index
     */
    showMoreTags(index) {
      this.moreTags = [];
      if (index === this.tagNumbers - 1) {
        // 省略的数组就是完整 tags 数组截去前面可显的数组
        this.moreTags = this.searchResultObj.tags.slice(this.tagNumbers - 1);
        this.$refs.eachTag[index].style.cursor = 'zoom-in';
      }
    }
  }
}
</script>

<style scoped lang="scss">
.tag {
  height: 24px;
  color: #485665;
  border-radius: 2px;
  padding: 3px 8px;
  margin: 3px 5px;
  cursor: default;

  &:first-child {
    margin-left: 0;
  }

  a {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }

  img {
    height: 12px;
    opacity: .8;
  }
}

</style>