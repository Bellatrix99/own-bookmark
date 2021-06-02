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
    searchResultNew: {
      type: Object,
      default: () => {}
    },
    searchResultObj: {
      type: Object,
      default: () => {}
    },
    tagNumbers: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      moreTags: [],
    }
  },
  methods: {
    showMoreTags(index) {
      this.moreTags = [];
      if (index === this.tagNumbers - 1) {
        this.moreTags = this.searchResultObj.tags.slice(this.tagNumbers - 1);
        this.$refs.eachTag[index].style.cursor = 'pointer';
      }
    }
  }
}
</script>

<style scoped lang="scss">
.tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  font-size: 12px;
  color: #485665;
  background-color: rgba(217, 240, 255, 0.62);
  border-radius: 2px;
  padding: 3px 8px;
  margin: 3px 5px;

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