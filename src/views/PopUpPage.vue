<template>
  <div class="popup-page">
    <div
        class="top-box"
        :class="{'animate__searchUp': showBookMarkList, 'animate__topBoxToTop':showStarPage}">
      <div class="main-page-center" :class="{'animate__starButtonUp': showStarPage}">
        <div class="search-header flex align-center flex-nowrap">
          <!-- 输入框组件 -->
          <v-text-field
              placeholder="搜索书签..."
              filled
              rounded
              clearable
              hide-details
              v-model="searchInputVal"
              @focus="() => toggleSearchExpandStatus(true)"
          ></v-text-field>
          <v-btn text :class="{hidden: !showBookMarkList}" @click="() => toggleSearchExpandStatus(false)">取消</v-btn>
        </div>
        <transition
            name="bookmark-transition"
            enter-active-class="animate__animated animate__fadeInDown"
        >
          <div class="bookmark-outer-div" v-if="showBookMarkList">
            <!-- 书签目录组件 -->
            <v-virtual-scroll
                height="480"
                item-height="80"
                :items="filteredBookmarkData"
            >
              <template v-slot:default="{ item: bookmark }">
                <BookMarkItem
                    :id="bookmark.id"
                    :title="bookmark.title"
                    :url="bookmark.url"
                    :favicon="bookmark.favicon"
                    :tags="bookmark.tags"
                />
              </template>

            </v-virtual-scroll>
          </div>
        </transition>
        <v-divider class="divider" inset/>
        <transition-group
            name="others-transition"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
        >
          <div class="star-btn-wrapper" :class="{'animate__starButtonOuterUp' : this.showStarPage}"
               key="starButtonOuter" v-if="!this.showBookMarkList">
            <!-- 点击收藏按钮组件 -->
            <v-btn
                class="mx-4"
                id="star-btn"
                fab
                depressed
                dark
                color="#f4b828"
                @click="toggleStarPageShowStatus"
            >
              <v-icon dark large>
                mdi-star-outline
              </v-icon>
            </v-btn>
          </div>
        </transition-group>
      </div>
      <transition
          name="star-page-transition"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOutDown"
          mode="out-in"
      >
        <!-- 新增收藏组件 -->
        <StarPage
            v-if="showStarPage"
            key="StarPage"
            :show="showStarPage"
            @close="toggleStarPageShowStatus"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { getBookmarkData } from '@/mock/popup';
import BookMarkItem from "@/components/popup/BookMarkItem";
import StarPage from "@/components/popup/StarPage";
import { fuseJsResultDisplay, getFuseResult, getSearchInputVal, getVisibleBookMarkObj } from "@/utils/Globle";

export default {
  name: "PopUpPage",
  components: { BookMarkItem, StarPage },
  data() {
    return {
      // 是否显示书签目录状态布尔值
      showBookMarkList: false,
      // 是否显示收藏页状态布尔值
      showStarPage: false,
      // 搜索输入框是否上升(动画)状态布尔值
      searchInputUp: false,
      // 搜索输入框中输入的值
      searchInputVal: "",
      // 全局的已收藏书签数组
      bookmarkItems: [],
    }
  },
  created() {
    this.loadBookmarkData();
  },
  computed: {
    /**
     * @description 用于处理需要显示的搜索结果
     * (如果在隐藏书签列表中,则不显示; 反之显示)
     * @return {Array}
     */
    filteredBookmarkData() {
      // TODO: 模糊搜索
      const keyword = this.searchInputVal;
      return this.bookmarkItems?.filter((bookmarkItem) => {
        return bookmarkItem.title.includes(keyword) || bookmarkItem.tags?.some?.((tag) => {
          tag?.text?.includes(keyword);
        })
      });
    }
  },
  methods: {
    async loadBookmarkData() {
      this.bookmarkItems = await getBookmarkData();
    },
    /**
     * @description 用于展开输入框
     * @param {Boolean} status
     */
    toggleSearchExpandStatus(status) {
      this.showBookMarkList = status ?? !this.showBookMarkList;
      this.searchInputUp = status ?? !this.searchInputUp;
    },
    /**
     * @description 用于切换收藏页是否显示
     */
    toggleStarPageShowStatus() {
      this.showStarPage = !this.showStarPage;
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
  }
}
</script>

<style>
body {
  width: 450px;
  height: 550px;
}
</style>

<style scoped lang="scss">

.popup-page {
  width: 450px;
  height: 550px;
  overflow: hidden;

  .top-box {
    padding-top: 180px;
    transition: 0.4s;
  }

  .search-header {
    display: flex;
    width: 80%;
    margin: auto;

    button {
      flex-shrink: 0;
      transition: all 0.5s, opacity .3s;

      &.hidden {
        width: 0 !important;
        min-width: 0 !important;
        padding: 0 !important;
        opacity: 0 !important;
      }
    }
  }

  .divider {
    width: 50px;
    margin: 30px auto;
  }

  #star-btn {
    i {
      font-size: 28px !important;
    }
  }

  .star-btn-wrapper {
    text-align: center;
    transition: 1s;
  }

  .animate__starButtonOuterUp {
    width: 100%;
    border-radius: 20px;
    margin-left: 0;
    background-color: #f4b828;
  }

  .animate__fadeIn {
    animation-duration: 1s;
  }

  .animate__fadeInDown {
    animation-duration: .4s;
  }

  .animate__fadeOut {
    animation-duration: 0s;
  }


  .animate__topBoxToTop {
    padding-top: 0;
  }

  .animate__searchUp {
    padding-top: 20px;
  }

  .main-page-center {
    transition: 0.4s;
  }

  .animate__starButtonUp {
    margin-top: -115px;
    background-color: #f4b828;
  }

  .bookmark-outer-div {
    ::v-deep {
      .bookmark-item {
        margin: 15px;
      }
    }
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      width: 20px;
      background-color: rgba(0, 0, 0, .2);
      border-radius: 10px;
      -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);
    }
  }

  &::-webkit-scrollbar { /*滚动条整体样式*/
    width: 1vw; /*高宽分别对应横竖滚动条的尺寸*/
    max-width: 10px;
  }

  &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.15);
  }
}

.bookmark-outer-div::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 5px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);
}


</style>
