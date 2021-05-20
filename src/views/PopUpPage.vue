<template>
  <div class="container" ref="container">
    <div class="top-box" ref="topBox">
      <search-input @toggleExpand="handleSearchExpand" @renderBookmark="renderBookmark"
                    @handleClickSearch="handleClickSearch" ref="searchInput"/>
      <BookMarkItem v-if="showBookMarkList" :search-input-value="searchInputValue"
                    ref="BookMarkItemChild" @topBoxMoveIn="topBoxMoveIn"
                    @cancelButton="cancelButton" @appendSearchPage="appendSearchPage"/>
      <p id="or">Or</p>
      <StarButton @ToggleStarPage="handleStarPage"/>
      <StarPage v-if="showStarPage"/>
    </div>
  </div>
</template>

<script>
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
    topBoxMoveIn() {
      console.log("topBoxMoveIn was calling!");
      this.animationInOut.elementMoveIn(this.$refs.topBox, 'top-box-search');
    },
    cancelButton() {
      console.log("cancelButton was calling!");
      this.$refs.searchInput.cancelButtonMoveIn();
    },
    handleClickSearch() {
      if (this.$Globle.currentPage !== this.$Globle.SEARCH) {
        // console.log(this.animationInOut.elementMoveOut);
        this.$refs.BookMarkItemChild.handleClickSearch();
      }
    },
    appendSearchPage() {
      console.log("抵达最后一步")
      // this.$refs.container.style.backgroundColor = black;
    }
  }
}
</script>

<style scoped lang="scss">
* {
  overflow-x: hidden;
}

.top-box {
}

#or {
  text-align: center;
  font-size: 20px;
  letter-spacing: .3em;
  font-weight: lighter;
  margin: 15px auto;
  color: #191d22;
}
</style>