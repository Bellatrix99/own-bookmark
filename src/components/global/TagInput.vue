<template>
  <div class="form-item" id="form-item-tag">
    <label for="bookmark-tags">标签</label>
    <div class="input tags-box" id="tag-input" @click="addTagsFocus" @keydown="handleTagInputKeyDown">
      <div class="tag" v-for="(tagName,index) in this.editTags.tagNames" :key="index + '-only'">
        <span>{{ tagName }}</span>
        <a id="text-close" @click="deleteTagBtn(index)">
          <img src="@/assets/close.svg" alt="close-btn"/>
        </a>
      </div>
      <input id="bookmark-tags" type="text" :style="bookMarkTagsStyle"
             ref="inputTags" @keyup="handleTagInputChange"
             v-model="tagInputValue"
      />
    </div>
  </div>
</template>

<script>
import {searchResult} from "@/mock/popup";

export default {
  name: "tagInput",
  data() {
    return {
      // 单个书签,包括所有 tags 的数组
      bookMarkTagsStyle: {
        width: this.getInputValueLength
      },
      // 显示的所有 tag 组成的数组
      tags: {
        id: this.BookMarkInfoIndex,
        tagNames: [],
      },
      // 编辑模态框中正在编辑的所有 tags
      editTags: {
        id: 0,
        tagNames: []
      },
      // 输入内容的长度
      inputValueLength: "",
      // tagInput 中输入的值
      tagInputValue: "",
    }
  },
  props: {
    // 当前书签下标
    BookMarkInfoIndex: {
      type: Number,
      default: 0
    },
    // 是否展示收藏页
    showStarPage: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 如果不是 starPage 收藏页下的该组件,则 tagBox 显示其对应的所有 tag,
    // 否则为空(因为收藏页是要新增收藏)
    if (this.showStarPage === true) {
      this.editTags.tagNames = [];
    } else {
      this.editTags.tagNames = searchResult[this.tags.id].tags.slice(0);
    }
  },
  computed: {
    // 书签 tags 的样式
    getInputValueLength() {
      return this.inputValueLength + 'em';
    }
  },
  methods: {
    /**
     * @description 用于给新增 tags 输入框聚焦
     */
    addTagsFocus() {
      this.$refs.inputTags.focus();
    },
    /**
     * @description 用于监听当前键盘按键, 用于删除标签
     * @param {Object} event
     */
    handleTagInputKeyDown(event) {
      if (event.key === 'Backspace' && this.tagInputValue === '') {
        if (this.$refs.inputTags.previousElementSibling) {
          this.editTags.tagNames.pop();
        }
      }
    },
    /**
     * @description 用于监听点击删除时间, 用于删除书签
     * @param {Number} index
     */
    deleteTagBtn(index) {
      this.editTags.tagNames.splice(index, 1);
    },
    /**
     * @description 用于监听tag输入,
     * 输入好标签名称之后按下空格或是逗号即可将输入的值变成一个具有样式的 tag 标签
     * @param {Object} event
     */
    handleTagInputChange(event) {
      // 拿到 tagInput 的输入值
      let value = this.tagInputValue;
      // 正则匹配空格
      let regex = /\s/g;
      // 匹配空格的总数
      let spaceNum = value.match(regex);
      // 正则匹配以中英文逗号结尾的输入值
      const match = value.match(/(.+)[,，]/);
      // 拿到输入值的长度
      this.inputValueLength = value.length;
      // 如果匹配不为空(匹配成功) 并且匹配组有两个
      // 并且当前按下的按键是"中英文逗号之一"
      if (match !== null && match.length === 2 && (event.key === "," || event.key === "，")) {
        // 则将匹配组第二个(也就是逗号前面的部分)推入 editTags(正在编辑的tag)
        this.editTags.tagNames.push(match[1]);
        // 并且清空输入框的值
        this.tagInputValue = "";
        // 或者当输入框的值不为空并且空格的长度不等于输入的总长(即不能全为空格)并且按下 Enter 回车键
      } else if (this.tagInputValue !== "" &&
          spaceNum?.length !== value.length && event.key === "Enter") {
        // 则推入当前的输入值
        this.editTags.tagNames.push(value);
        // 并且清空输入框的值
        this.tagInputValue = "";
      }
      // 告知父组件获取正在编辑的标签们--editTags
      this.$emit('getEditTags', this.editTags);
    },
  }
}
</script>

<style scoped lang="scss">
.input {
  flex-grow: 1;
  height: 25px;
  border: 1px solid var(--light-border-color);
  border-radius: 3px;
  overflow: hidden;

  input {
    width: calc(100% - 20px);
    height: 100%;
    border: none;
    padding: 0 5px;
  }
}

input, textarea {
  outline: none;
}

#tag-input {
  //display: flex;
  //justify-content:center;
  text-align: left;
  //height: calc(var(--star-tag-input-height) - 20px);
  height: 90%;
  width: 100%;
  align-items: baseline;
  cursor: text;
  flex-wrap: wrap;
  overflow-y: scroll;

  input {
    width: 6em;
    height: 20px;
    min-width: 1em;
  }
}

.tag {
  display: inline-flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 28px;
  font-size: 12px;
  color: #485665;
  background-color: rgba(217, 240, 255, 0.62);
  border-radius: 2px;
  padding: 3px 8px;
  margin: 3px 5px;

  a {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }

  img {
    height: 12px;
    opacity: .8;
  }
}

a {
  cursor: pointer;
  transition: all .5s;
  text-decoration: none;
  color: gray;
}

label {
  width: 60px;
  font-size: 12px;
  line-height: var(--form-item-height);
  max-width: 80px;
  text-align: left;
  cursor: default;
}

#form-item-tag {
  height: var(--star-tag-input-height);
  margin-top: 8px;
  align-items: start;

  label {
    line-height: inherit;
  }
}
</style>