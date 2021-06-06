<template>
  <div class="search-page" v-if="showBookMarkSearch">
    <!-- 用于挂载搜索结果相关 DOM -->
    <div class="search-item">
      <div class="search-item-icon-box" :title="searchResultObj.title">
        <img :src="searchResultObj.icon" alt="item-icon" :href="searchResultObj.href" @click="openTab">
      </div>
      <div class="search-info">
        <h2 :href="searchResultObj.href" @click="openTab" :title="searchResultObj.title"
            class="bookmark-title"
        >
          {{ searchResultNew.title }}
        </h2>
        <div class="tag-box">
          <!-- popup 页的 tag 输入盒子组件 -->
          <TagBoxPopup :searchResultNew="searchResultNew" :tagNumbers="tagNumbers"
                       :searchResultObj="searchResultObj"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TagBoxPopup from "@/components/popup/TagBoxPopup";

export default {
  name: "BookMarkItem",
  components: {TagBoxPopup},
  props: {
    // 已收藏列表的单个项
    searchResultObj: {
      type: Object,
      default: () => ({})
    },
    // 需要隐藏的书签下标数组
    hiddenBookMarkIndex: {
      type: Array,
      default: () => []
    },
    // 已收藏列表单个项对应的下标
    searchResultIndex: {
      type: Number,
      default: 0
    },
    // tag 标签组最长字符数量
    maxTagTextLength: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      // 经过拷贝的"已收藏列表的单个项"
      searchResultNew: {},
      // tag 总长度
      allTagLength: 0,
      // 当前 tag 显示数量
      tagNumbers: "",
      // 理论最大可显 tag 数量
      maxShowTagNumbers: 6,
    }
  },
  methods: {
    /**
     * @description 用于监听点击事件来打开书签的网站
     * @param {Object} event
     */
    openTab(event) {
      // 在新标签页打开链接
      window.open(event.target.attributes.href.value, '_blank');
    },
    /**
     * @description 用于省略过长文字
     */
    omitLongText() {
      let allTags = this.searchResultObj.tags;
      // 使用 JSON.parse(JSON.stringify(XXX)) 来完成简易的深拷贝
      this.searchResultNew = JSON.parse(JSON.stringify(this.searchResultObj));
      // 拓展运算符完成浅拷贝
      // this.searchResultNew = {...this.searchResultObj};
      for (let tagIndex in allTags) {
        // 避免原型链上有 tagIndex 属性
        if (Object.prototype.hasOwnProperty.call(allTags, tagIndex)) {
          this.allTagLength += allTags[tagIndex].length;
          // 如果当前已显示 tag 的文字总长度超过16 或 tag 数量已经超过最大可显数量
          // 则tagNumbers取当前下标和最大可显数量的较小值
          // 其余 tag 都被替代成"..." 跟在后面
          if (this.allTagLength > this.maxTagTextLength || tagIndex > this.maxShowTagNumbers) {
            this.tagNumbers = tagIndex < this.maxShowTagNumbers ? tagIndex : this.maxShowTagNumbers;
            this.searchResultNew.tags.splice(this.tagNumbers, 99, "...");
            this.searchResultNew.tags = this.searchResultNew.tags.slice(0, this.tagNumbers);
          }
        }
      }
    }
  },
  mounted() {
    // 调用省略过长文字的方法
    this.omitLongText();
  },
  computed: {
    /**
     * @description 用于处理需要显示的搜索结果
     * (如果在隐藏书签列表中,则不显示; 反之显示)
     * @return Boolean
     */
    showBookMarkSearch() {
      for (let oneArr of this.hiddenBookMarkIndex) {
        if (this.searchResultIndex === oneArr) {
          return false;
        }
      }
      return true;
    },

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
    width: 30px;
    height: 50%;
    cursor: pointer;

    img {
      height: 100%;
    }
  }

}

.search-info {
  margin-left: 20px;

  .bookmark-title {
    width: 14em;
    white-space: nowrap; // 连续的空白符会被合并，换行符会被当作空白符来处理。
    text-overflow: ellipsis; // 如果空间太小到连省略号都容纳不下，那么这个省略号也会被截断。
    overflow: hidden;
  }
}

.tag-box {
  display: flex;
}

</style>