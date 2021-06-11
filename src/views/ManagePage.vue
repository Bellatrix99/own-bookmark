<template>
  <div class="container">
    <div class="bookmark-filter">
      <!-- 管理页顶部以搜索框为主体的组件 -->
      <BookMarkFilter ref="bookMarkFilter"
                      @getVisibleBookMarkObj="getVisibleBookMarkObj"
                      @getFuseResult="getFuseResult"
                      @getSearchInputVal="getSearchInputVal"
                      @fuseJsResultDisplay="fuseJsResultDisplay"
      />
    </div>
    <div class="default-container">
      <a-row :gutter="24">
        <a-col :span="18" class="bookmark-info-outer">
          <!-- 书签信息页组件 -->
          <BookMarkInfo v-for="(item,index) in showSearchResult" :key="index + '-only'"
                        @load="getSearchResultIndex(item)"
                        :ref="`bookMarkInfo${index}`"
                        :searchResultObj="item"
                        :searchResultIndex="index"
                        :currId="item.id - 1"
                        :hiddenBookMarkIndex="hiddenBookMarkIndex"
                        :fuseResult="fuseResult"
                        :searchInputVal="searchInputVal"
                        @darkSearch="darkSearch"
                        @getClickBookMark="getClickBookMark"
                        @handleEditBookMark="handleEditBookMark"
                        @deleteBKIndex="deleteBKIndex"
          />
          <div v-if="this.isEmptySearchResult"
               class="noSearchResult"
          >
            <p>无书签，请先新增书签</p>
          </div>
        </a-col>
        <a-col :span="6" class="tag-box-outer">
          <!-- 可选的 tag 盒子组件 -->
          <tagBox/>
        </a-col>
      </a-row>
    </div>
    <!-- 编辑书签信息的模态框组件 -->
    <transition
        name="star-page-transition"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
    >
      <EditBookMarkInfo v-if="showEditBookMarkInfo" @handleEditBookMark="handleEditBookMark"
                        :BookMarkInfoIndex="this.BookMarkInfoIndex"
      />
    </transition>
  </div>
</template>

<script>
import {searchResult} from '@/mock/popup';
import BookMarkFilter from "@/components/manage/BookMarkFilter";
import TagBox from "@/components/manage/TagBox";
import BookMarkInfo from "@/components/manage/BookMarkInfo";
import EditBookMarkInfo from "@/components/manage/EditBookMarkInfo";
import {getSearchInputVal, getFuseResult, fuseJsResultDisplay, getVisibleBookMarkObj} from "@/utils/Globle";

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
      // (模糊搜索之后)可见的书签链接数组
      visibleBookMarkSet: [],
      // (模糊搜索之后)可见的书签数组
      visibleBookMarkArr: [],
      // (模糊搜索之后)不可见的书签下标数组
      hiddenBookMarkIndex: [],
      // (模糊搜索之前)原来的数组下标数组
      originBookMarkIndex: [],
      // 当前书签信息的下标
      BookMarkInfoIndex: 0,
      // manage 页顶部搜索框输入的值
      searchInputVal: "",
      // fuseJs 模糊搜索的结果
      fuseResult: [],
      // v-for 循环的 index
      searchResultIndex: 0,
      // fuseJs 模糊搜索结果数组
      fuseJsResultArr: [],
      // 当前的 id
      currId: 0
    };
  },
  methods: {
    darkSearch() {
      this.$refs.bookMarkFilter.fuseSearch();
      this.$refs.bookMarkFilter.darkSearchBookMark();
    },
    /**
     * @description 用于拿到当前循环的 index 实例
     * @param {Object} item
     */
    getSearchResultIndex(item) {
      this.searchResultIndex = item.id;
    },
    /**
     * @description 用于获取搜索输入框输入的值
     * @param {String} searchInputVal
     */
    getSearchInputVal(searchInputVal) {
      getSearchInputVal(this, searchInputVal);
    },
    /**
     * @description 用于获取模糊搜索结果
     */
    getFuseResult(fuseResult) {
      getFuseResult(this, fuseResult)
    },
    /**
     * @description 用于将模糊搜索的结果合并到一个数组中
     */
    fuseJsResultDisplay() {
      fuseJsResultDisplay(this)
    },
    /**
     * @description 用于取得可见的书签下标值数组
     */
    getVisibleBookMarkObj() {
      getVisibleBookMarkObj(this);
    },
    /**
     * @description 用于传递"编辑模态框"是否显示的状态布尔值
     * @param {Boolean} editable
     */
    handleEditBookMark(editable) {
      this.showEditBookMarkInfo = editable;
    },
    /**
     * @description 用于删除对应传入 index 的书签
     // * @param {Number} currId
     */
    deleteBKIndex(currId) {
      console.log(searchResult.filter(
          bookmark => bookmark.id - 1 !== currId
      ));
      this.searchResult = this.searchResult.filter(bookmark => bookmark.id - 1 !== currId);
      // searchResult.splice(searchResult.filter(bookmark => bookmark.id - 1 === currId), 1);
      // 如果书签已全部删除,则设置"isEmptySearchResult(书签为空)"状态为真
      if (searchResult.length === 0) {
        this.isEmptySearchResult = true;
      }
    },
    /**
     * @description 用于取得当前点击的书签下标值
     * @param {Number} currId
     */
    getClickBookMark(currId) {
      this.BookMarkInfoIndex = currId;
    },
  },
  mounted() {
    // 拿到原始的书签下标数组,长度为已收藏书签的长度
    this.originBookMarkIndex = [...new Array(this.searchResult.length).keys()];
    this.getVisibleBookMarkObj();
  }
  ,
  computed: {
    /**
     * @description 用于处理需要显示的搜索结果
     * (如果在隐藏书签列表中,则不显示; 反之显示)
     * @return {Array}
     */
    showSearchResult() {
      if (this.visibleBookMarkSet.length === 0) return this.searchResult;
      return this.searchResult.filter(
          bookmark => this.visibleBookMarkSet.some(href => bookmark.href === href)
      );
    }
  }
}
</script>
<style scoped lang="scss">
@media (max-width: 650px) {
  .bookmark-info-outer {
    width: 100%;
    box-shadow: rgba(167,167,167,48%) -1px -1px 10px;
    background-color: white;
    padding: 12px;
    border-radius: 14px;
  }
  .tag-box-outer {
    display: none !important;
  }
  .default-container {
    border-radius: 3px;
    width: 80%;
    margin: -120px auto 30px;
  }
}

.animate__fadeIn {
  animation-duration: 0.5s;
}

.animate__fadeOut {
  animation-duration: 0.3s;
}

.container {
  //transition: all 1s;
}

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
  //transition: 1s;
}

.tag-box-outer {
  position: sticky;
  top: 5%;
}

.bookmark-info-outer {
  height: 100%;
  box-shadow: rgba(167,167,167,48%) -1px -1px 10px;
  background-color: white;
  padding: 12px;
  border-radius: 14px;
}

.noSearchResult {
  height: 40vh;
  text-align: center;

  p {
    height: 20vh;
    line-height: 20vh;
    font-size: 20px;
  }
}
</style>