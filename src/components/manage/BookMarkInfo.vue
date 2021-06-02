<template>
  <div class="bookmark-info" v-if="showBookMarkSearch()">
    <div class="favicon">
      <img :src="searchResultObj.icon" alt="item-icon">
    </div>
    <div class="content">
      <h1>
        <a :href="searchResultObj.href">{{ searchResultObj.title }}</a>
      </h1>
      <p>{{ searchResultObj.href }}</p>
      <div class="tag-box-inner">
        <div class="tag" v-for="(tag,index) in searchResultObj.tags" :key="index + '-only'">{{ tag }}</div>
      </div>
    </div>
    <div class="operation-btn">
      <button @click="handleToggleEdit">
        <img src="../../assets/edit.svg" alt="edit-btn" id="edit-btn">
      </button>
      <button @click="deleteBookMarkItem">
        <img src="../../assets/remove.svg" alt="remove-btn" id="remove-btn">
      </button>
    </div>
  </div>
</template>

<script>
// import Bus from "@/assets/Bus";

export default {
  name: "BookMarkInfo",
  props: {
    searchResultObj: {
      type: Object
    },
    searchResultIndex: {
      type: Number
    },
    hiddenBookMarkIndex: {
      type: Array
    },
    searchInputVal: {
      type: String
    }
  },
  data() {
    return {
      editable: false,
    }
  },
  methods: {
    handleToggleEdit() {
      this.editable = true;
      // Bus.$emit('getClickBookMark', this.searchResultIndex);
      this.$emit('getClickBookMark', this.searchResultIndex);
      this.$emit('handleEditBookMark', this.editable);
    },
    deleteBookMarkItem() {
      if (this.searchInputVal !== "") {
        this.$emit('darkSearchBookMark', this.searchInputVal);
      }
      this.$emit("deleteBKIndex", this.searchResultIndex);
    },
    showBookMarkSearch() {
      for (let oneArr of this.hiddenBookMarkIndex) {
        if (this.searchResultIndex === oneArr) {
          return false;
        }
      }
      return true;
    },
  },
}
</script>

<style scoped lang="scss">
.bookmark-info {
  display: flex;
  position: relative;
  margin-bottom: 20px;
  padding: 15px 25px;
  border-radius: 5px;
  transition: all .3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .content {
    width: 80%;
    margin: 0 70px 0 20px;

    h1 {
      font-size: 25px;
      transition: all .5s;

      a {
        word-wrap: anywhere;
      }
    }

    .tag-box-inner {
      margin-top: 10px;
    }
  }

  .favicon {
    width: 35px;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
    }
  }

  .operation-btn {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;

    button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      margin: 0 5px;

      img {
        width: 20px;
        filter: opacity(0.7);
        transition: all .5s;
      }

      #remove-btn {
        width: 25px;
        margin-bottom: 1px;
      }
    }
  }
}

</style>