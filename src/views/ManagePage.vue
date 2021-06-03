<template>
  <div class="container">
    <div class="bookmark-filter">
      <!-- 管理页顶部以搜索框为主体的组件 -->
      <BookMarkFilter @getVisibleBookMarkIndex="getVisibleBookMarkIndex"
                      @getSearchInputVal="getSearchInputVal"
                      ref="BookMarkFilter"
      />
    </div>
    <div class="default-container">
      <a-row :gutter="24">
        <a-col :span="18" class="bookmark-info-outer">
          <!-- 书签香惜信息页组件 -->
          <BookMarkInfo v-for="(item,index) in searchResult" :key="index + '-only'"
                        :searchResultObj="item" :searchResultIndex="index"
                        :hiddenBookMarkIndex="hiddenBookMarkIndex"
                        :searchInputVal="searchInputVal"
                        @getClickBookMark="getClickBookMark"
                        @handleEditBookMark="handleEditBookMark"
                        @deleteBKIndex="deleteBKIndex"
                        @darkSearchBookMark="darkSearchBookMark"
          />
          <div v-if="this.isEmptySearchResult">
            没有数据
          </div>
        </a-col>
        <a-col :span="6" class="tag-box-outer">
          <!-- 可选的 tag 盒子组件 -->
          <tagBox/>
        </a-col>
      </a-row>
    </div>
    <!-- 编辑书签信息的模态框组件 -->
    <EditBookMarkInfo v-if="showEditBookMarkInfo" @handleEditBookMark="handleEditBookMark"
                      :BookMarkInfoIndex="this.BookMarkInfoIndex"
    />
  </div>
</template>

<script>
import {searchResult} from '@/mock/popup';
import BookMarkFilter from "@/components/manage/BookMarkFilter";
import TagBox from "@/components/manage/TagBox";
import BookMarkInfo from "@/components/manage/BookMarkInfo";
import EditBookMarkInfo from "@/components/manage/EditBookMarkInfo";

export default {
  name: "ManagePage",
  components: {EditBookMarkInfo, BookMarkInfo, TagBox, BookMarkFilter},
  data() {
    return {
      // 全局的已收藏书签数组
      searchResult: searchResult,
      // 是否显示书签信息编辑模态框的状态布尔值
      showEditBookMarkInfo: false,
      // 搜索结果是否为空的状态布尔值
      isEmptySearchResult: false,
      // (模糊搜索之后)可见的书签下标数组
      visibleBookMarkIndex: [],
      // (模糊搜索之后)不可见的书签下标数组
      hiddenBookMarkIndex: [],
      // (模糊搜索之前)原来的数组下标数组
      originBookMarkIndex: [],
      // 当前书签信息的下标
      BookMarkInfoIndex: 0,
      // manage 页顶部搜索框输入的值
      searchInputVal: ""
    };
  },
  methods: {
    /**
     * @description 用于传递"编辑模态框"是否显示的状态布尔值
     * @param {Boolean} editable
     * @return void
     */
    handleEditBookMark(editable) {
      this.showEditBookMarkInfo = editable;
    },
    /**
     * @description 用于删除对应传入 index 的书签
     * @param {Number} searchResultIndex
     * @return void
     */
    deleteBKIndex(searchResultIndex) {
      searchResult.splice(searchResultIndex, 1);
      // 如果书签已全部删除,则设置"isEmptySearchResult(书签为空)"状态为真
      if (searchResult.length === 0) {
        this.isEmptySearchResult = true;
      }
    },
    /**
     * @description 用于取得可见的书签下标值数组
     * @param {Number} visibleBookMarkIndex
     * @return void
     */
    getVisibleBookMarkIndex(visibleBookMarkIndex) {
      this.visibleBookMarkIndex = visibleBookMarkIndex;
      // 通过对原始书签下标数组与可见数组下标数组求其补集,得到应该隐藏的书签下标数组
      this.hiddenBookMarkIndex = this.originBookMarkIndex.filter(
          (val) => {
            if (Object.prototype.hasOwnProperty.call(this.originBookMarkIndex, val)) {
              return this.visibleBookMarkIndex.indexOf(val) === -1
            }
          }
      );
    },
    /**
     * @description 用于取得当前点击的书签下标值
     * @param {Number} searchResultIndex
     * @return void
     */
    getClickBookMark(searchResultIndex) {
      this.BookMarkInfoIndex = searchResultIndex;
    },
    /**
     * @description 用于调用该组件的子组件的模糊搜索方法
     * @return void
     */
    darkSearchBookMark() {
      this.$refs.BookMarkFilter.darkSearchBookMarkVal();
    },
    /**
     * @description 用于获取搜索输入框输入的值
     * @param {String} searchInputVal
     * @return void
     */
    getSearchInputVal(searchInputVal) {
      this.searchInputVal = searchInputVal;
    }
  },
  mounted() {
    // 拿到原始的书签下标数组,长度为已收藏书签的长度
    this.originBookMarkIndex = [...new Array(this.searchResult.length).keys()];
  }
}
</script>

<style scoped lang="scss">
.bookmark-filter {
  width: 100%;
  height: 400px;
  background-color: #ffb030;
  overflow: hidden;
}

.default-container {
  border-radius: 3px;
  width: 80%;
  margin: -100px auto 30px;
}

.tag-box-outer {
  position: sticky;
  top: 5%;
}

.bookmark-info-outer {
  box-shadow: rgba(167,167,167,48%) -1px -1px 10px;
  background-color: white;
  padding: 12px;
  border-radius: 14px;
}

</style>