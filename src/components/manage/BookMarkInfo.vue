<template>
  <div class="bookmark-info">
    <div class="favicon">
      <img :src="searchResultObj.icon" alt="item-icon"
           :onerror="errorImg"
      >
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
        <img src="@/assets/edit.svg" alt="edit-btn" id="edit-btn">
      </button>
      <button @click="deleteBookMarkItem">
        <img src="@/assets/remove.svg" alt="remove-btn" id="remove-btn">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookMarkInfo",
  mounted() {
  },
  props: {
    // 模糊搜索列表的单个项
    searchResultObj: {
      type: Object,
      default: () => ({})
    },
    // 已收藏列表单个项对应的下标
    searchResultIndex: {
      type: Number,
      default: 0
    },
    // 当前书签的 id
    currId: {
      type: Number,
      default: 0
    },
    // 隐藏的书签下标数组
    hiddenBookMarkIndex: {
      type: Array,
      default: () => []
    },
    // 搜索框输入内容
    searchInputVal: {
      type: String,
      default: ""
    },
    // 已收藏列表的单个项
    searchResultItem: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 编辑模态框是否弹出
      editable: false,
      // fuseJs 模糊搜索结果数组
      fuseJsResultArr: [],
      // 图片加载有误显示的图片
      errorImg: 'this.src="' + require('@/assets/error-3.svg') + '"',
    }
  },
  methods: {
    /**
     * @description 用于切换模态框的显示并传递状态量
     */
    handleToggleEdit() {
      this.editable = true;
      this.$emit('getClickBookMark', this.currId);
      this.$emit('handleEditBookMark', this.editable);
    },
    /**
     * @description 用于删除书签项目;
     * 如果当前输入内容不为空则继续保持模糊搜索结果,然后在模糊搜索结果上进行删除;
     * 如果当前输入内容为空则在所有书签列表上进行删除
     */
    deleteBookMarkItem() {
      console.log(this.currId)
      this.$emit("deleteBKIndex", this.currId);
      if (this.searchInputVal !== "") {
        this.$emit('darkSearch');
      }
    },
  },
  computed: {}
}
</script>

<style scoped lang="scss">
@media (max-width: 600px) {
  .favicon {
    display: none !important;
  }
  .content {
    width: 80%;
    padding-right: 10px;
  }
  button {
    &:before {
      content: "";
      position: absolute;
    }
  }
  #edit-btn {
    &:before {
      top: -10px;
      bottom: -10px;
      left: -10px;
    }
  }
  #remove-btn {
    &:before {
      top: -10px;
      bottom: -10px;
      right: -10px;
    }
  }
}

.bookmark-info {
  display: flex;
  position: relative;
  margin-bottom: 10px;
  padding: 15px 25px;
  border-radius: 10px;
  transition: all .3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .content {
    width: 75%;
    margin-left: 10px;

    h1 {
      font-size: 25px;
      transition: all .5s;

      a {
        word-wrap: anywhere;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    p {
      font-size: 16px;
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