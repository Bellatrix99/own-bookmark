<template>
  <div class="container" ref="container">
    <div class="top-box" ref="topBox"
         :class="{'animate__searchUp': this.showBookMarkList, 'animate__topBoxToTop':this.showStarPage}">
      <div class="main-page-center" :class="{'animate__starButtonUp': this.showStarPage}">
        <!-- 输入框组件 -->
        <search-input @toggleExpand="handleSearchExpand"
                      ref="searchInput"
        />
        <transition
            name="bookmark-transition"
            enter-active-class="animate__animated animate__fadeInDown"
        >
          <div v-if="showBookMarkList" class="bookmark-outer-div">
            <!-- 书签目录组件 -->
            <BookMarkItem :search-input-value="searchInputValue" ref="BookMarkItemChild"
                          v-for="item in searchResult" :key="item.length" :searchResultObj='item'
            />
          </div>
        </transition>
        <transition-group
            name="others-transition"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
        >
          <p id="or" v-show="!this.showBookMarkList" key="orP">or</p>
          <div class="star-btn-outer" :class="{'animate__starButtonOuterUp' : this.showStarPage}"
               key="starButtonOuter" v-show="!this.showBookMarkList">
            <!-- 点击收藏按钮组件 -->
            <StarButton @ToggleStarPage="handleStarPage" key="starButton"/>
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
        <StarPage v-if="showStarPage" key="StarPage" @showStarPage="handleStarPage"/>
      </transition>
    </div>
  </div>
</template>

<script>
import {searchResult} from '@/mock/popup';
import SearchInput from "@/components/popup/SearchInput";
import BookMarkItem from "@/components/popup/BookMarkItem";
import StarButton from "@/components/popup/StarButton";
import StarPage from "@/components/popup/StarPage";

export default {
  name: "PopUpPage",
  components: {StarButton, BookMarkItem, SearchInput, StarPage},
  data() {
    return {
      // 是否显示书签目录状态布尔值
      showBookMarkList: false,
      // 是否显示收藏页状态布尔值
      showStarPage: false,
      // 搜索输入框是否上升(动画)状态布尔值
      searchInputUp: false,
      // 搜索输入框中输入的值
      searchInputValue: "",
      // 全局的已收藏书签数组
      searchResult: searchResult,
      // 某个已收藏的书签
      item: {},
    }
  },
  methods: {
    /**
     * @description 用于展开输入框
     * @param {Boolean} expanded
     */
    handleSearchExpand({expanded}) {
      this.showBookMarkList = expanded;
      this.searchInputUp = true;
    },
    /**
     * @description 用于切换收藏页是否显示
     * @param {Boolean} showStarPage
     * @retur void
     */
    handleStarPage(showStarPage) {
      if (this.showStarPage === showStarPage) {
        this.showStarPage = !showStarPage;
      } else {
        this.showStarPage = showStarPage;
      }
    },
    /**
     * @description 用于切换收藏页是否显示
     */
    handleToggleExpand() {
      this.$refs.searchInput.handleToggleExpand()
    },
  }
}
</script>

<style scoped lang="scss">
* {
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.star-btn-outer {
  margin-left: calc(50% - 20px);
  width: 40px;
  transition: 1s;
}

.animate__starButtonOuterUp {
  width: 100%;
  border-radius: 20px;
  margin-left: 0;
  background-color: #f4b828;
}

.container {
  width: 400px;
  height: 500px;
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

.top-box {
  padding-top: 25%;
  transition: 0.4s;
}

.animate__topBoxToTop {
  padding-top: 0;
}

.animate__searchUp {
  padding-top: 10%;
}

.main-page-center {
  transition: 0.4s;
}

.animate__starButtonUp {
  margin-top: -90px;
  background-color: #f4b828;
}

#or {
  text-align: center;
  font-size: 20px;
  letter-spacing: .3em;
  font-weight: lighter;
  margin: 15px auto;
  color: #191d22;
}

.bookmark-outer-div {
  width: 90%;
  height: 300px;
  overflow-y: scroll;
  margin-top: 10px;
  padding: 10px 10px 0 10px;

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