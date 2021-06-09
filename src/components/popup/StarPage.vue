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
      <TagInput :showStarPage="showStarPage"/>
    </form>
    <div class="operate-group">
      <button id="deleteBtn" class="button" @click="starPageBackToMain">取消</button>
      <button id="addBtn" class="button" @click="handleAddMark">添加</button>
    </div>
  </div>
</template>

<script>
import TagInput from "@/components/global/TagInput";

export default {
  name: "StarPage",
  components: {TagInput},
  data() {
    return {}
  },
  props: {
    showStarPage: {
      type: Boolean,
      default: false
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
     * @description 用于确定新增书签
     */
    handleAddMark() {

    }
  },
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

</style>