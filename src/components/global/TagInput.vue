<template>
  <div class="form-item" id="form-item-tag">
    <label for="bookmark-tags">标签</label>
    <div class="input tags-box" id="tag-input" @click="addTagsFocus" @keydown="handleTagInputKeyDown">
      <div class="tag" v-for="(tagName,index) in this.tags.tagNames" :key="index + '-only'">
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
export default {
  name: "tagInput",
  data() {
    return {
      // 单个书签,包括所有 tags 的数组
      bookMarkTagsStyle: {
        width: this.getInputValueLength
      },
      tags: {
        tagNames: [],
      },
      // 输入内容的长度
      inputValueLength: "",
      // tagInput 中输入的值
      tagInputValue: "",
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
          this.tags.tagNames.pop();
        }
      }
    },
    /**
     * @description 用于监听点击删除时间, 用于删除书签
     * @param {Number} index
     */
    deleteTagBtn(index) {
      this.tags.tagNames.splice(index, 1);
    },
    /**
     * @description 用于监听tag输入,
     * 输入好标签名称之后按下空格或是逗号即可将输入的值变成一个具有样式的 tag 标签
     * @param {Object} event
     */
    handleTagInputChange(event) {
      let value = this.tagInputValue;
      let regex = /\s/g;
      let spaceNum = value.match(regex);
      const match = value.match(/(.+)[,，]/);
      this.inputValueLength = value.length;
      if (match !== null && match.length === 2 && (event.key === "," || event.key === "，")) {
        this.tags.tagNames.push(match[1]);
        this.tagInputValue = "";
      } else if (spaceNum?.length !== value.length && event.key === "Enter") {
        this.tags.tagNames.push(value);
        this.tagInputValue = "";
      }
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