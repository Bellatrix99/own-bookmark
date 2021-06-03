<template>
  <div class="star-page">
    <form>
      <div class="form-item">
        <label for="bookmark-title">标题</label>
        <div class="input">
          <input type="text" name="title" id="bookmark-title"/>
        </div>
      </div>
      <div class="form-item">
        <label for="bookmark-folder">描述</label>
        <div class="input">
          <input type="text" name="title" id="bookmark-folder"/>
        </div>
      </div>
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
                 ref="inputTags" @input="handleTagInputChange"
          />
        </div>
      </div>
    </form>
    <div class="operate-group">
      <button id="deleteBtn" class="button" @click="starPageBackToMain">取消</button>
      <button id="addBtn" class="button" @click="handleAddMark">添加</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "StarPage",
  data() {
    return {
      // 输入内容的长度
      inputValueLength: "",
      // 书签 tags 的样式
      bookMarkTagsStyle: {
        width: this.inputValueLength + 'em'
      },
      // 单个书签,包括所有 tags 的数组
      tags: {
        tagNames: [],
      },
    }
  },
  methods: {
    /**
     * @description 用于返回到主页 (显示收藏页状态布尔值设为 false)
     */
    starPageBackToMain() {
      this.$emit("showStarPage", false)
    },
    /**
     * @description 用于给新增 tags 输入框聚焦
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
          this.tags.tagNames.pop();
        }
      }
    },
    /**
     * @description 用于监听tag输入,
     * 输入好标签名称之后按下空格或是逗号即可将输入的值变成一个具有样式的 tag 标签
     * @param {Object} event
     * @return void
     */
    handleTagInputChange(event) {
      let value = event.target.value;
      const match = value.match(/(.+)[,，]/);
      this.inputValueLength = value.length;
      if (match !== null && match.length === 2 && match[1].lastIndexOf(" ") !== match[1].length - 1) {
        this.tags.tagNames.push(match[1]);
        event.target.value = "";
      }
    },
    /**
     * @description 用于监听点击删除时间, 用于删除书签
     * @param {Number} index
     * @return void
     */
    deleteTagBtn(index) {
      this.$nextTick(function () {
        this.tags.tagNames.splice(index, 1);
      })
    },
    /**
     * @description 用于确定新增书签
     * @return void
     */
    handleAddMark() {

    }
  }
}

</script>

<style scoped lang="scss">
form {
  display: block;
  margin-top: 20px;

  .form-item {
    width: 80%;
    margin: auto;
    display: flex;
    align-items: center;
    height: var(--form-item-height);

    label {
      width: 50px;
      font-size: 12px;
      line-height: var(--form-item-height);
      max-width: 80px;
      text-align: left;
      cursor: default;
    }
  }

  .input {
    flex-grow: 1;
    height: 25px;
    border: 1px solid var(--light-border-color);
    border-radius: 3px;
    overflow: hidden;

    input {
      width: 100%;
      height: 100%;
      border: none;
      padding: 0 10px;
      outline: none;
    }
  }
}

.operate-group {
  width: 80%;
  margin: auto;
}

#addBtn {
  float: right;
  background-color: var(--star-btn-color);
  color: white;
  border: none;
}

#deleteBtn {
  float: left;
}

button {
  height: 30px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all .5s;
}

.button {
  font-size: 13px;
  padding: 5px 20px;
  color: #2d3139;
  border: 1px solid var(--light-border-color);
  border-radius: 5px;
  box-shadow: 0 0 3px #efefef;
  transition: all .5s;
}

#form-item-tag {
  height: var(--star-tag-input-height);
  margin-top: 8px;
  align-items: start;

  label {
    line-height: inherit;
  }
}


#tag-input {
  display: flex;
  //justify-content:center;
  text-align: left;
  height: calc(var(--star-tag-input-height) - 20px);
  width: 228px;
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
    padding: 0 10px;
  }
}

input, textarea {
  outline: none;
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
</style>