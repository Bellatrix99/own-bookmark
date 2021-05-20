<template>
  <div class="search-page" ref="searchPage">
    <!-- 用于挂载搜索结果相关 DOM -->
    <h1>{{ searchInputValue }}</h1>
    <div class="search-item" v-for="item in searchResult" :key="item.length">
      <div class="search-item-icon-box">
        <img :src="item.icon" alt="item-icon">
      </div>
      <div class="search-info">
        <h2 :href="item.href" @click="openTab">{{ item.title }}</h2>
        <div class="tag-box">
          <div class="tag" v-for="tag in item.tags.slice(0,4)" :key="Math.random() * tag.length">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {searchResult} from '../../mock/popup/index.mjs';

export default {
  name: "BookMarkItem",
  props: ['searchInputValue'],
  data() {
    return {
      searchResult: searchResult
    }
  },
  methods: {
    openTab(e) {
      console.dir(e.target);
      // console.log([...item.tags])
      // console.log(e.attributes.href.nodeValue)
      window.open(e.target.attributes.href.value, '_blank');
    },
    renderSearchItem() {
    },
    handleClickSearch() {
      if (this.$Globle.currentPage !== this.$Globle.SEARCH) {
        this.animationInOut.elementMoveIn(this.$refs.searchPage, 'search-page-show', 500, () => {
          this.$emit('topBoxMoveIn');
          this.$emit('cancelButton');
          this.$emit('appendSearchPage');
          this.$Globle.currentPage = this.$Globle.SEARCH;// 这里有问题
        });
        console.log("这不是Search页面")
      }
    }
  }
}
</script>

<style scoped lang="scss">

.search-item {
  display: flex;
  align-items: center;
  height: var(--search-item-height);
  overflow: hidden;
  padding: 5px 15px;
  margin-bottom: 10px;
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
    height: 50%;
    overflow: hidden;

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
