<template>
  <div class="container" ref="container" :class="{}">
    <div class="top-box" ref="topBox" :class="{'topBoxAnimate': this.showBookMarkList}">
      <div class="top-box-top" :class="{'containerAnimate': this.showStarPage}">
        <search-input @toggleExpand="handleSearchExpand" @renderBookmark="renderBookmark"
                      ref="searchInput"
        />
        <transition
            name="bookmark-transition"
            enter-active-class="animate__animated animate__fadeInDown"
            mode="out-in"
        >
          <div v-if="showBookMarkList" class="BookMarkItemDiv">
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
          <p id="or" v-show="!this.showBookMarkList" key="orP">Or</p>
          <StarButton @ToggleStarPage="handleStarPage" v-show="!this.showBookMarkList"
                      key="StarButton"/>
        </transition-group>
      </div>
      <transition
          name="star-page-transition"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOutDown"
          mode="out-in"
      >
        <StarPage v-if="showStarPage" key="StarPage" @showStarPage="handleStarPage"/>
      </transition>
    </div>
  </div>
</template>

<script>
import {searchResult} from '../mock/popup/index';
import SearchInput from "@/components/popup/SearchInput";
import BookMarkItem from "@/components/popup/BookMarkItem";
import StarButton from "@/components/popup/StarButton";
import StarPage from "@/components/popup/StarPage";

export default {
  name: "PopUpPage",
  components: {StarButton, BookMarkItem, SearchInput, StarPage},
  data() {
    return {
      showBookMarkList: false,
      showStarPage: false,
      searchInputUp: false,
      searchInputValue: "",
      searchResult: searchResult,
      item: ""
    }
  },
  methods: {
    handleSearchExpand({expanded}) {
      this.showBookMarkList = expanded;
      this.searchInputUp = true;
    },
    handleStarPage(showStarPage) {
      if (this.showStarPage === showStarPage) {
        this.showStarPage = !showStarPage;
      } else {
        this.showStarPage = showStarPage;
      }
    },
    handleToggleExpand() {
      this.$children[0].handleToggleExpand()
    },
    renderBookmark(searchInputValue) {
      this.searchInputValue = searchInputValue
      this.$refs.BookMarkItemChild.renderSearchItem();
    },
  }
}
</script>

<style scoped lang="scss">
* {
  overflow: hidden;
}

.animate__fadeIn {
  animation-duration: 1s;
}

.animate__fadeInDown {
  animation-duration: 0.6s;
}

.animate__fadeOut {
  animation-duration: 0s;
}

.top-box {
  margin-top: 20%;
  transition: 0.6s;
}

.topBoxAnimate {
  margin-top: 10%;
}

.top-box-top {
  transition: 0.5s;
}

.containerAnimate {
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

.BookMarkItemDiv {
  width: 90%;
  height: 300px;
  overflow-y: scroll;
  margin-top: 10px;
  padding: 10px 10px 0 10px;

  &:hover {
    &::-webkit-scrollbar-thumb {
      width: 20px;
      background-color: rgba(0,0,0,.2);
      border-radius: 10px;
      -webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.1);
    }
  }

  &::-webkit-scrollbar {/*滚动条整体样式*/
    width: 1vw;     /*高宽分别对应横竖滚动条的尺寸*/
  }
  &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background-color: rgba(0,0,0,0.2);
  }
}

.BookMarkItemDiv::-webkit-scrollbar-thumb:hover{
  background-color: rgba(0,0,0,0.5);
  border-radius: 5px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.1);

}

</style>