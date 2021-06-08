<template>
  <div class="mask-layout">
    <div class="edit-modal">
      <div class="operate-header">
        <h2>修改书签</h2>
        <button class="close-btn" @click="closeEditBookMarkInfo">
          <img src="@/assets/close.svg" alt="close-btn">
        </button>
      </div>
      <div class="content">
        <div class="bookmark-list-item">
          <div class="favicon">
            <img :src="getIcon" alt="item-icon">
          </div>
          <div class="form-item">
            <div class="form-content">
              <div class="form-item">
                <label>标题</label>
                <div class="input-item">
                  <input type="text" :value="getTitle">
                </div>
              </div>
              <div class="form-item">
                <label>URL</label>
                <div class="input-item">
                  <input type="text" :value="getHref">
                </div>
              </div>
              <TagInput :BookMarkInfoIndex = "BookMarkInfoIndex"/>
            </div>
          </div>
        </div>
      </div>
      <div class="operate-bottom">
        <div class="operate-btn">
          <button class="finish-btn" @click="finishEditBookMarkInfo">完成</button>
          <button class="cancel-btn" @click="closeEditBookMarkInfo">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {searchResult} from "@/mock/popup";
import TagInput from "@/components/global/TagInput";

export default {
  name: "EditBookMarkInfo",
  components: {TagInput},
  props: {
    // 已收藏列表的单个项
    searchResultObj: {
      type: Object,
      default: () => ({})
    },
    // 当前书签的下标值
    BookMarkInfoIndex: {
      type: Number,
      default: 0
    }
  },
  mounted() {

  },
  data() {
    return {
      // 是否显示编辑模态框的状态布尔值
      showEditBookMarkInfo: false,
      // 全局的已收藏书签数组
      searchResult: searchResult,
      // 书签标签的样式设置(设置为输入字符长度对应的"em"长度)
      bookMarkTagsStyle: {
        width: this.inputValueLength + 'em'
      },
      // 当前书签下标在全局的已收藏书签数组中的所有 tags
      tags: {
        tagNames: searchResult[this.BookMarkInfoIndex].tags,
      },
      // 编辑模态框中正在编辑的所有 tags
      editTags: {
        tagNames: ""
      }
    }
  },
  methods: {
    /**
     * @description 用于编辑模态框完成编辑之后需要做的操作
     */
    finishEditBookMarkInfo() {
      // 简单的深拷贝数组
      this.editTags.tagNames = this.tags.tagNames.slice(0);
      this.showEditBookMarkInfo = false;
      searchResult[this.BookMarkInfoIndex].tags = this.editTags.tagNames;
      this.$emit('handleEditBookMark', this.showEditBookMarkInfo);
    },
    /**
     * @description 用于编辑模态框关闭之后需要做的操作
     */
    closeEditBookMarkInfo() {
      this.showEditBookMarkInfo = false;
      this.$emit('handleEditBookMark', this.showEditBookMarkInfo);
    },
  },
  computed: {
    getIcon() {
      if (!searchResult[this.BookMarkInfoIndex].icon) throw new Error("No icon!");
      return searchResult[this.BookMarkInfoIndex].icon;
    },
    getTitle() {
      if (!searchResult[this.BookMarkInfoIndex].title) throw new Error("No title!");
      return searchResult[this.BookMarkInfoIndex].title;
    },
    getHref() {
      if (!searchResult[this.BookMarkInfoIndex].href) throw new Error("No href!");
      return searchResult[this.BookMarkInfoIndex].href;
    }
  }
}
</script>

<style scoped lang="scss">
.mask-layout {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.55);

  .edit-modal {
    width: 60%;
    height: 450px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    min-width: 300px;
    min-height: 200px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 3px 3px 15px rgba(69, 69, 69, 72%);

    .operate-header {
      display: flex;
      align-content: center;
      margin: 15px 20px;

      h2 {
        font-size: 17px;
        font-weight: 400;
        flex-grow: 20;
      }

      .close-btn {
        height: 20px;
        border: none;
        background-color: transparent;
        cursor: pointer;

        img {
          height: 100%;
          opacity: .7;
          transition: all .5s;
        }
      }
    }

    .content {
      padding: 30px 40px;

      .bookmark-list-item {
        display: block;
        padding: 0;
        border: 0;
        transition: none;
        border-radius: 0;
        position: relative;
        margin-bottom: 20px;

        .favicon {
          text-align: center;
          margin-bottom: 20px;
          width: 35px;
          overflow: hidden;

          img {
            width: 100%;
            height: auto;
          }
        }

        .form-item {
          display: flex;
          align-items: center;
          border: none;

          .form-content {
            width: 100%;
            margin-left: 20px;
          }

          label {
            display: inline;
            width: 60px;
            font-size: 13px;
          }

          .input-item {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid rgba(179, 174, 185, 0.84);
            padding: 3px 5px;
            border-radius: 5px;
            cursor: text;
            margin-bottom: 8px;

            input {
              border: none;
              width: 100%;
            }
          }

        }
      }
    }
  }

  .operate-btn {
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 30px;

    .finish-btn,
    {
      right: 40px;
      background-color: #1aa1f1;
      position: absolute;
      border: none;
      font-size: 14px;
      border-radius: 5px;
      padding: 7px 15px;
      color: white;
      cursor: pointer;
      transition: all .5s;
    }

    .cancel-btn {
      position: absolute;
      border: none;
      font-size: 14px;
      border-radius: 5px;
      padding: 7px 15px;
      background-color: #f14c1a;
      color: white;
      cursor: pointer;
      transition: all .5s;
      left: 40px;
    }
  }
}

label {
  display: inline;
  width: 60px;
  font-size: 13px;
}
</style>