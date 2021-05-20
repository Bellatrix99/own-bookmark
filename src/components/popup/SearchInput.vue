<template>
  <div class="search-box">
    <label @focusin="handleToggleExpand">
      <input type="text" id="search" name="search" placeholder="搜索标签或书签" autocomplete="off"
              @input="renderBookmark" v-model="searchInputValue" @click="handleClickSearchInput">
    </label>
    <a id="search-input-operate-btn" v-show="expanded" @click="handleToggleExpand">取消</a>
  </div>
</template>

<script>

export default {
  name: "SearchInput",
  data() {
    return {
      expanded: false,
      searchInputValue: ""
    }
  },
  methods: {
    handleToggleExpand() {
      // 子组件可以使用 $emit 触发父组件的自定义事件
      // 第二参数是传给父组件的值
      // 父组件监听事件时，可以通过 $event 访问这个被抛出的值
      // console.log(this.expanded);
      this.expanded = !this.expanded;

      this.$emit('toggleExpand', {
        expanded: this.expanded
      });
    },

    renderBookmark() {
      this.$emit('renderBookmark', this.searchInputValue);
    },

    handleClickSearchInput() {
      this.$emit('handleClickSearch');
    },
    cancelButtonMoveIn() {
      console.log("收到")
    }
  },
}
</script>

<style scoped lang="scss">
.search-box {
  display: flex;
  align-items: center;
  width: 70%;
  margin: auto;
  height: var(--search-height);
  border-radius: 20px;
  padding: 0 var(--search-input-left-padding);
  background-color: #e9e9e9;

  label {
    flex-grow: 1;
  }

  input {
    width: 100%;
    height: 100%;
    margin-left: calc(50% - 4em - var(--search-input-left-padding) / 2 + var(--search-input-cancel-width));
    line-height: var(--search-height);
    border: none;
    outline: none;
    background-color: transparent;
    transition: all .3s;

    &:focus {
      margin-left: 0;
    }
  }

  #search-input-operate-btn {
    height: 20px;
    margin-left: 10px;
    color: #757575;
    transition: all .5s;
    cursor: pointer;
  }
}
</style>