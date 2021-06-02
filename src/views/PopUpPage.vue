<template>
  <div class="container" ref="container">
    <div class="top-box" ref="topBox"
         :class="{'animate__searchUp': this.showBookMarkList, 'animate__topBoxToTop':this.showStarPage}">
      <div class="main-page-center" :class="{'animate__starButtonUp': this.showStarPage}">
        <search-input @toggleExpand="handleSearchExpand" @renderBookmark="renderBookmark"
                      ref="searchInput"
        />
        <transition
            name="bookmark-transition"
            enter-active-class="animate__animated animate__fadeInDown"
        >
          <div v-if="showBookMarkList" class="bookmark-outer-div">
            <BookMarkItem :search-input-value="searchInputValue" ref="BookMarkItemChild"
                          v-for="item in searchResult" :key="item.length" :searchResultObj='item'
            />
          </div>
        </transition>
        <transition
            name="others-transition"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
        >
          <p id="or" v-show="!this.showBookMarkList" key="orP">or</p>
          <div class="star-btn-outer" :class="{'animate__starButtonOuterUp' : this.showStarPage}"
               key="starButtonOuter" v-show="!this.showBookMarkList">
            <StarButton @ToggleStarPage="handleStarPage" key="starButton"/>
          </div>
        </transition>
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
      this.$refs.searchInput.handleToggleExpand()
    },
    renderBookmark(searchInputValue) {
      this.searchInputValue = searchInputValue
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