<template>
  <div class="container">
    <div class="bookmark-filter">
      <BookMarkFilter @getVisibleBookMarkIndex="getVisibleBookMarkIndex"/>
    </div>
    <a-row class="default-container">
      <a-col :span="18" class="bookmark-info-outer">
        <BookMarkInfo v-for="(item,index) in searchResult" :key="index + '-only'"
                      :searchResultObj="item" :searchResultIndex="index"
                      :hiddenBookMarkIndex="hiddenBookMarkIndex"
                      @handleEditBookMark="handleEditBookMark" @deleteBKIndex="deleteBKIndex"
        />
        <div v-if="this.isEmptySearchResult">
          没有数据
        </div>
      </a-col>
      <a-col :span="6" class="tag-box-outer">
        <tagBox/>
      </a-col>
    </a-row>
    <EditBookMarkInfo v-if="showEditBookMarkInfo" @handleEditBookMark="handleEditBookMark"
    />
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
      visibleSearchResult: "",
      showEditBookMarkInfo: "",
      isEmptySearchResult: false,
      visibleBookMarkIndex: [],
      hiddenBookMarkIndex: [],
      originBookMarkIndex: []
    }
  },
  methods: {
    handleEditBookMark(editable) {
      this.showEditBookMarkInfo = editable;
    },
    deleteBKIndex(searchResultIndex) {
      searchResult.splice(searchResultIndex, 1);
      if (searchResult.length === 0) {
        this.isEmptySearchResult = true;
      }
    },
    getVisibleBookMarkIndex(visibleBookMarkIndex) {
      this.visibleBookMarkIndex = visibleBookMarkIndex;
      // this.visibleSearchResult = JSON.parse(JSON.stringify(this.searchResult));
      this.hiddenBookMarkIndex = this.originBookMarkIndex.filter(
          (val) => {
            if (Object.prototype.hasOwnProperty.call(this.originBookMarkIndex, val)) {
              return this.visibleBookMarkIndex.indexOf(val) === -1
            }
          }
      );
    }
  },
  mounted() {
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
  box-shadow: rgba(167,167,167,48%) -1px -1px 10px;
  background-color: white;
  border-radius: 3px;
  width: 80%;
  margin: -100px auto 30px;
}

.tag-box-outer {
  position: sticky;
  top: 5%;
}

.bookmark-info-outer {
  padding: 20px;
}

</style>