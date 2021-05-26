<template>
  <div class="search-page" ref="searchPage">
    <!-- 用于挂载搜索结果相关 DOM -->
    <div class="search-item" :title="searchResultOrigin.title">
      <div class="search-item-icon-box">
        <img :src="searchResultObj.icon" alt="item-icon">
      </div>
      <div class="search-info">
        <h2 :href="searchResultObj.href" @click="openTab">{{ searchResultObj.title }}</h2>
        <div class="tag-box">
          <div class="tag" v-for="tag in searchResultObj.tags.slice(0,4)" :key="Math.random() * tag.length">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <!--      <iframe class="iframe-web" frameborder='0' src="http://www.baidu.com"-->
    <!--              marginwidth="0" marginheight="0" scrolling="no" align="center"-->
    <!--      ></iframe>-->
  </div>
</template>

<script>
export default {
  name: "BookMarkItem",
  props: {
    searchResultObj: {
      type: Object
    }
  },
  data() {
    return {
      searchResultOrigin: ""
    }
  },
  methods: {
    openTab(e) {
      window.open(e.target.attributes.href.value, '_blank');
    },
  },
  mounted() {
    if (this.searchResultObj.title.length >= 20) {
      this.searchResultOrigin = JSON.parse(JSON.stringify(this.searchResultObj));
      this.searchResultObj.title = this.searchResultObj.title.slice(0, 20) + "...";
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
  padding: 5px 20px;
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
    margin-left: calc(50% - 110px);
    height: 50%;

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

//.iframe-web {
//  height: 100vh; /* Viewport-relative units */
//  width: 100vw;
//}

</style>
