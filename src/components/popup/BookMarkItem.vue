<template>
  <div class="search-page" ref="searchPage">
    <!-- 用于挂载搜索结果相关 DOM -->
    <div class="search-item">
      <div class="search-item-icon-box" :title="this.searchResultObj.title">
        <img :src="searchResultObj.icon" alt="item-icon" :href="searchResultObj.href" @click="openTab">
      </div>
      <div class="search-info">
        <h2 :href="searchResultObj.href" @click="openTab" :title="this.searchResultObj.title">{{
            searchResultNew.title
          }}</h2>
        <div class="tag-box">
          <TagBoxPopup :searchResultNew="searchResultNew" :tagNumbers="tagNumbers"
                       :searchResultObj="searchResultObj"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {calculateStringLength} from "@/utils/Globle";
import TagBoxPopup from "@/components/popup/TagBoxPopup";

export default {
  name: "BookMarkItem",
  components: {TagBoxPopup},
  props: {
    searchResultObj: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      searchResultNew: {},
      allTagLength: 0,
      tagNumbers: "",
      maxShowTagNumbers: 6,
    }
  },
  methods: {
    openTab(e) {
      window.open(e.target.attributes.href.value, '_blank');
    },
    omitLongText() {
      let allTags = this.searchResultObj.tags;
      this.searchResultNew = JSON.parse(JSON.stringify(this.searchResultObj));
      for (let tagIndex in allTags) {
        if (Object.prototype.hasOwnProperty.call(allTags, tagIndex)) {
          this.allTagLength += allTags[tagIndex].length;
          if (this.allTagLength > 16 || tagIndex > this.maxShowTagNumbers) {
            this.tagNumbers = tagIndex < this.maxShowTagNumbers ? tagIndex : this.maxShowTagNumbers;
            this.searchResultNew.tags.splice(this.tagNumbers, 99, "...");
            this.searchResultNew.tags = this.searchResultNew.tags.slice(0, this.tagNumbers);
          }
        }
      }
      if (calculateStringLength(this.searchResultObj.title).len > 26) {
        if (calculateStringLength(this.searchResultObj.title).hans
            >= calculateStringLength(this.searchResultObj.title).chars
        ) {
          this.searchResultNew.title = this.searchResultObj.title.slice(0, 16) + "...";
        } else {
          this.searchResultNew.title = this.searchResultObj.title.slice(0, 22) + "...";
        }
      }
    }
  },
  mounted() {
    this.omitLongText();
  }
}
</script>

<style scoped lang="scss">
.search-item {
  display: flex;
  align-items: center;
  height: var(--search-item-height);
  overflow: hidden;
  margin: 0 0 10px 10px;
  border-radius: 8px;
  transition: all .5s;

  &:hover {
    background-color: #f0f3f5b3;
  }

  h2 {
    color: #36373d;
    cursor: pointer;
    text-align: left;
    font-size: 16px;
    font-weight: normal;
    line-height: 20px;
    margin: 3px 0;
  }

  .search-item-icon-box {
    margin-left: calc(50% - 144px);
    height: 50%;
    cursor: pointer;

    img {
      height: 100%;
    }
  }

}

.search-info {
  margin-left: 20px;
}

.tag-box {
  display: flex;
}

</style>
