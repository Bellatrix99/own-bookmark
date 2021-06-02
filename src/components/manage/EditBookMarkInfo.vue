<template>
  <div class="mask-layout">
    <div class="edit-modal">
      <div class="operate-header">
        <h2>修改书签</h2>
        <button class="close-btn" @click="closeEditBookMarkInfo">
          <img src="../../assets/close.svg" alt="close-btn">
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
              <div class="form-item">
                <label>标签</label>
                <div class="tag-input-box" @click="addTagsFocus" @keydown="handleTagInputKeyDown">
                  <div class="tag" v-for="(tagName,index) in this.editTags.tagNames"
                       :key="index + '-only'">
                    <span>{{ tagName }}</span>
                    <a id="text-close" @click="deleteTagBtn(index)">
                      <img src="../../assets/close.svg" alt="close-btn"/>
                    </a>
                  </div>
                  <input id="bookmark-tags" type="text" :style="bookMarkTagsStyle"
                         ref="inputTags" @input="tagInputChange"
                  />
                </div>
              </div>
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

export default {
  name: "EditBookMarkInfo",
  props: {
    searchResultObj: {
      type: Object
    },
    BookMarkInfoIndex: {
      type: Number
    }
  },
  mounted() {
    this.editTags.tagNames = this.tags.tagNames.slice(0);
  },
  data() {
    return {
      showEditBookMarkInfo: "",
      searchResult: searchResult,
      bookMarkClickIndex: null,
      bookMarkTagsStyle: {
        width: this.inputValueLength + 'em'
      },
      tags: {
        tagNames: searchResult[this.BookMarkInfoIndex].tags,
      },
      editTags: {
        tagNames: ""
      }
    }
  },
  methods: {
    finishEditBookMarkInfo() {
      console.log(this.editTags)
      this.showEditBookMarkInfo = false;
      searchResult[this.BookMarkInfoIndex].tags = this.editTags.tagNames;
      this.$emit('handleEditBookMark', this.showEditBookMarkInfo);
    },
    closeEditBookMarkInfo() {
      this.showEditBookMarkInfo = false;
      this.$emit('handleEditBookMark', this.showEditBookMarkInfo);
    },
    tagInputChange(event) {
      let value = event.target.value;
      const match = value.match(/(.+)[\s,，]/);
      this.inputValueLength = value.length;
      if (match !== null && match.length === 2 && match[1].lastIndexOf(" ") !== match[1].length - 1) {
        this.editTags.tagNames.push(match[1]);
        event.target.value = "";
      }
    },
    deleteTagBtn(index) {
      this.$nextTick(function () {
        this.tags.tagNames.splice(index, 1);
      })
    },
    addTagsFocus() {
      this.$nextTick(function () {
        //DOM 更新了
        this.$refs.inputTags.focus();
      })
    },
    handleTagInputKeyDown(event) {
      if (event.key === 'Backspace' && event.target.value === '') {
        if (this.$refs.inputTags.previousElementSibling) {
          this.tags.tagNames.pop();
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
    width: 70%;
    height: 450px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    min-width: 300px;
    min-height: 200px;
    background-color: white;
    border-radius: 5px;
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
      padding: 20px;

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

          .tag-input-box {
            height: 150px;
            width: 100%;
            border: 1px solid rgba(218, 213, 226, 0.84);
            background-color: #fdfdfd;
            padding: 0 5px;
            border-radius: 5px;
            cursor: text;
            overflow-y: scroll;
            overflow-x: hidden;

            input {
              width: 6em;
              height: 20px;
              min-width: 1em;
            }

            #text-close {
              display: flex;
              align-items: center;
              height: 15px;
              margin-left: 5px;
              border: none;
              background-color: transparent;
              overflow: hidden;
              cursor: pointer;

              img {
                height: 70%;
                filter: opacity(0.7);
                transition: all .5s;
              }
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
    height: 20px;
    left: 0;
    bottom: 30px;

    .finish-btn {
      right: 30px;
      background-color: #1aa1f1;
      position: absolute;
      border: none;
      font-size: 10px;
      border-radius: 5px;
      padding: 7px 15px;
      color: white;
      cursor: pointer;
      transition: all .5s;
    }

    .cancel-btn {
      position: absolute;
      border: none;
      font-size: 10px;
      border-radius: 5px;
      padding: 7px 15px;
      background-color: #f14c1a;
      color: white;
      cursor: pointer;
      transition: all .5s;
      left: 30px;
    }
  }
}
</style>