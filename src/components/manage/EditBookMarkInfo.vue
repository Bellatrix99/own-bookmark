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
            <img :src="searchResult[this.BookMarkInfoIndex].icon" alt="item-icon">
          </div>
          <div class="form-item">
            <div class="form-content">
              <div class="form-item">
                <label>标题</label>
                <div class="input-item">
                  <input type="text" :value="searchResult[this.BookMarkInfoIndex].title">
                </div>
              </div>
              <div class="form-item">
                <label>URL</label>
                <div class="input-item">
                  <input type="text" :value="searchResult[this.BookMarkInfoIndex].href">
                </div>
              </div>
<!--              <div class="form-item">-->
<!--                <label>标签</label>-->
<!--                <div class="tag-input-box" @click="addTagsFocus" @keydown="handleTagInputKeyDown">-->
<!--                  <div class="tag" v-for="(tagName,index) in this.editTags.tagNames"-->
<!--                       :key="index + '-only'">-->
<!--                    <span>{{ tagName }}</span>-->
<!--                    <a id="text-close" @click="deleteTagBtn(index)">-->
<!--                      <img src="@/assets/close.svg" alt="close-btn"/>-->
<!--                    </a>-->
<!--                  </div>-->
<!--                  <input id="bookmark-tags" type="text" :style="bookMarkTagsStyle"-->
<!--                         ref="inputTags" @input="tagInputChange"-->
<!--                  />-->
<!--                </div>-->
<!--              </div>-->
              <TagInput/>
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
    },
    // 当前书签的下标值
    BookMarkInfoIndex: {
      type: Number,
      default: () => 0
    }
  },
  mounted() {
    // 简单的深拷贝数组
    this.editTags.tagNames = this.tags.tagNames.slice(0);
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
     * @return void
     */
    finishEditBookMarkInfo() {
      this.showEditBookMarkInfo = false;
      searchResult[this.BookMarkInfoIndex].tags = this.editTags.tagNames;
      this.$emit('handleEditBookMark', this.showEditBookMarkInfo);
    },
    /**
     * @description 用于编辑模态框关闭之后需要做的操作
     * @return void
     */
    closeEditBookMarkInfo() {
      this.showEditBookMarkInfo = false;
      this.$emit('handleEditBookMark', this.showEditBookMarkInfo);
    },
    /**
     * @description 用于监听tag输入,
     * 输入好标签名称之后按下空格或是逗号即可将输入的值变成一个具有样式的 tag 标签
     * @param {Object} event
     * @return void
     */
    tagInputChange(event) {
      let value = event.target.value;
      // 使用正则表达式匹配输入的值(某个以逗号结尾的字符串)
      const match = value.match(/(.+)[,，]/);
      this.inputValueLength = value.length;
      // 如果匹配后的内容不为空且匹配的组有两个
      // 那么当组匹配的第一项中不是以空格结尾,则将输入的值传给 editTags 数组,
      // 最后渲染成具有一定样式的 tag 标签
      if (match !== null && match.length === 2 && match[1].lastIndexOf(" ") !== match[1].length - 1) {
        this.editTags.tagNames.push(match[1]);
        // 清空输入内容
        event.target.value = "";
      }
    },
    /**
     * @description 用于监听点击删除时间, 用于删除书签
     * @param {Number} index
     * @return void
     */
    deleteTagBtn(index) {
      this.tags.tagNames.splice(index, 1);
      this.editTags.tagNames = this.tags.tagNames
    },
    /**
     * @description 用于聚焦输入框
     * @return void
     */
    addTagsFocus() {
        this.$refs.inputTags.focus();
    },
    /**
     * @description 用于监听当前键盘按键, 用于删除标签
     * @param {Object} event
     * @return void
     */
    handleTagInputKeyDown(event) {
      if (event.key === 'Backspace' && event.target.value === '') {
        if (this.$refs.inputTags.previousElementSibling) {
          this.editTags.tagNames.pop();
        }
      }
    },
  },
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

          #bookmark-tags {
            border: none;
            background-color: transparent;
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