<template>
  <div class="container" ref="container">
    <div class="top-box" ref="topBox">
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
          leave-active-class="animate__animated animate__fadeOutDown"
          mode="out-in"
      >
        <p id="or" v-show="!this.showBookMarkList" key="orP">Or</p>
        <StarButton @ToggleStarPage="handleStarPage" v-show="!this.showBookMarkList" key="StarButton"/>
        <StarPage v-if="showStarPage" key="StarPage"/>
      </transition-group>
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
      searchInputValue: "",
      searchResult: searchResult,
      item: ""
    }
  },
  methods: {
    handleSearchExpand({expanded}) {
      this.showBookMarkList = expanded;
    },
    handleStarPage(showStarPage) {
      console.log(showStarPage)
      this.showStarPage = showStarPage;
    },
    handleToggleExpand() {
      console.log(this.$children[0]);
      this.$children[0].handleToggleExpand()
    },
    renderBookmark(searchInputValue) {
      this.searchInputValue = searchInputValue
      this.$refs.BookMarkItemChild.renderSearchItem();
      console.log(this.$refs.BookMarkItemChild);
    },
  }
}
</script>

<style scoped lang="scss">
.animate__fadeIn {
  animation-duration: 1s;
}

.animate__fadeInDown,
.animate__fadeOutDown {
  animation-duration: 0.6s;
}

* {
  overflow: hidden;
}

.container {
  width: 80%;
  height: 50%;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
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
    height: 210px;
    overflow-y: scroll;
    margin-top: 10px;
    padding: 10px 10px 0 10px;
}
</style>