<template>
  <!-- 用于挂载搜索结果相关 DOM -->
  <v-card
      flat
      class="bookmark-item"
  >
    <div class="favicon flex-shrink-0">
      <v-img
          aspect-ratio="1"
          height="50"
          width="50"
          :src="favicon"
          @error="handleLoadFaviconFailed"
      >
        <template v-slot:placeholder>
          <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
          >
            <v-progress-circular
                indeterminate
                color="blue lighten-3"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </div>
    <div class="bookmark-info">
      <h4
          class="bookmark-title"
          @click="openTab"
      >
        {{ title }}
      </h4>
      <div class="tag-box">
        <v-chip
            v-for="item in 10"
            :key="item"
            class="ma-1"
            x-small
            color="primary"
        >
          {{ item }}
        </v-chip>
      </div>
      <v-divider/>
    </div>
  </v-card>
</template>

<script>

import { imageOptions } from "@/config/imageOptions";

export default {
  name: "BookMarkItem",
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    favicon: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      imageFailure: false,
    }
  },
  computed: {
    faviconURL() {
      return this.imageFailure ? imageOptions.failureImageURL : this.favicon
    }
  },
  methods: {
    /**
     * @description 用于监听点击事件来打开书签的网站
     */
    openTab() {
      // 在新标签页打开链接
      //  FIXME: 真实打开 Chrome 新标签 URL
      window.open(this.url);
    },
    handleLoadFaviconFailed() {
      this.imageFailure = true;
    }
  },
}
</script>

<style scoped lang="scss">
.bookmark-item {
  display: flex;
  align-items: center;
  height: var(--search-item-height);
  overflow: hidden;
  border-radius: 8px;
  padding: 10px;
  transition: all .5s;

  &:hover {
    background-color: #f0f3f5b3;
  }

  .favicon {
    flex-basis: 50px;
  }

  .bookmark-info {
    margin-left: 20px;

    .bookmark-title {
      cursor: pointer;
      white-space: nowrap; // 连续的空白符会被合并，换行符会被当作空白符来处理。
      text-overflow: ellipsis; // 如果空间太小到连省略号都容纳不下，那么这个省略号也会被截断。
      overflow: hidden;
    }
  }

  .tag-box {
    display: flex;
  }
}


</style>
