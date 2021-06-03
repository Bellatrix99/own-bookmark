<template>
  <div class="search-page" ref="searchPage">
    <!-- 用于挂载搜索结果相关 DOM -->
    <div class="search-item">
      <div class="search-item-icon-box" :title="this.searchResultObj.title">
        <img :src="searchResultObj.icon" alt="item-icon" :href="searchResultObj.href" @click="openTab">
      </div>
      <div class="search-info">
        <h2 :href="searchResultObj.href" @click="openTab" :title="this.searchResultObj.title">
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
import {calculateStringLength} from "@/utils/Globle";
import TagBoxPopup from "@/components/popup/TagBoxPopup";

export default {
  name: "BookMarkItem",
  components: {TagBoxPopup},
  props: {
    // 已收藏列表的单个项
    searchResultObj: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      // 经过深拷贝的"已收藏列表的单个项"
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
     * @return void
     */
    openTab(event) {
      // 在新标签页打开链接
      window.open(event.target.attributes.href.value, '_blank');
    },
    /**
     * @description 用于省略过长文字
     * @return void
     */
    omitLongText() {
      let allTags = this.searchResultObj.tags;
      // 使用 JSON.parse(JSON.stringify(XXX)) 来完成简易的深拷贝
      this.searchResultNew = JSON.parse(JSON.stringify(this.searchResultObj));
      for (let tagIndex in allTags) {
        // 避免原型链上有 tagIndex 属性
        if (Object.prototype.hasOwnProperty.call(allTags, tagIndex)) {
          this.allTagLength += allTags[tagIndex].length;
          // 如果当前已显示 tag 的文字总长度超过16 或 tag 数量已经超过最大可显数量
          // 则tagNumbers取当前下标和最大可显数量的较小值
          // 其余 tag 都被替代成"..." 跟在后面
          if (this.allTagLength > 16 || tagIndex > this.maxShowTagNumbers) {
            this.tagNumbers = tagIndex < this.maxShowTagNumbers ? tagIndex : this.maxShowTagNumbers;
            this.searchResultNew.tags.splice(this.tagNumbers, 99, "...");
            this.searchResultNew.tags = this.searchResultNew.tags.slice(0, this.tagNumbers);
          }
        }
      }
      // 用于判断标题中汉字和字符的比例, 如果汉字所占比例大于字符,则最大可显长度为16,反之为为22
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
    // 调用省略过长文字的方法
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
