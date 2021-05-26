<template>
  <div class="container">
    <div class="bookmark-filter">
      <BookMarkFilter/>
    </div>
    <div class="default-container">
      <tagBox/>
      <div class="bookmark-info-outer">
        <BookMarkInfo v-for="(item,index) in searchResult" :key="index + '-only'" :searchResultObj="item"
                      :searchResultIndex="index" @handleEditBookMark="handleEditBookMark"
                      @deleteBKIndex="deleteBKIndex"
        />
      </div>
    </div>
    <EditBookMarkInfo v-if="showEditBookMarkInfo" @handleEditBookMark="handleEditBookMark"/>
  </div>
</template>

<script>
import {searchResult} from '../mock/popup/index';
import BookMarkFilter from "@/components/manage/BookMarkFilter";
import TagBox from "@/components/manage/TagBox";
import BookMarkInfo from "@/components/manage/BookMarkInfo";
import EditBookMarkInfo from "@/components/manage/EditBookMarkInfo";

export default {
  name: "ManagePage",
  components: {EditBookMarkInfo, BookMarkInfo, TagBox, BookMarkFilter},
  data() {
    return {
      searchResult: searchResult,
      showEditBookMarkInfo: ""
    }
  },
  methods: {
    handleEditBookMark(editable) {
      this.showEditBookMarkInfo = editable;
    },
    deleteBKIndex(searchResultIndex) {
      searchResult.splice(searchResultIndex, 1);
    }
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
  box-shadow: rgba(167,167,167,48%) -1px -1px 10px;
  background-color: white;
  border-radius: 3px;
  width: 80%;
  margin: -100px auto 30px;
}

.bookmark-info-outer {
  padding: 20px;
}

</style>