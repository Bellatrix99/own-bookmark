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
        <label for="bookmark-folder">文件夹</label>
        <div class="input">
          <input type="text" name="title" id="bookmark-folder"/>
        </div>
      </div>
      <div class="form-item" id="form-item-tag">
        <label for="bookmark-tags">标签</label>
        <div class="input tags-box" id="tag-input">
          <input id="bookmark-tags" type="text"/>
        </div>
      </div>
    </form>
    <div class="operate-group">
      <button id="deleteBtn" class="button" @click="starPageBackToMain">取消</button>
      <button id="addBtn" class="button">添加</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "StarPage",
  data() {
    return {
    }
  },
  methods: {
    starPageBackToMain() {
      this.$emit("showStarPage", false)
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
      width: calc(100% - 20px);
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