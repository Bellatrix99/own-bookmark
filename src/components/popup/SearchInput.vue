<template>
  <div class="search-box-outer">
    <div class="search-box" @click="handleToggleExpand">
      <label>
        <input type="text" id="search" name="search" placeholder="搜索标签或书签" autocomplete="off"
               @input="renderBookmark" v-model="searchInputValue">
      </label>
      <transition
          name="cancel-button"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
      >
        <a id="search-input-operate-btn" v-show="expanded" @click="handleToggleExpand">取消</a>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: "SearchInput",
  data() {
    return {
      expanded: false,
      searchInputValue: "",
      showAnimate: false
    }
  },
  methods: {
    handleToggleExpand(e) {
      // 子组件可以使用 $emit 触发父组件的自定义事件
      // 第二参数是传给父组件的值
      // 父组件监听事件时，可以通过 $event 访问这个被抛出的值
      this.expanded = e.target.tagName === 'INPUT';
      this.$emit('toggleExpand', {
        expanded: this.expanded
      });
    },

    renderBookmark() {
      this.showAnimate = true;
      this.$emit('renderBookmark', this.searchInputValue);
    },
  },
}
</script>

<style scoped lang="scss">
.animate__fadeIn,
.animate__fadeOut {
  animation-duration: 0.5s;
}
.search-box-outer {
  position: relative;
  z-index: 9999;
}

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
    margin-left: -28px;
    line-height: 40px;
    font-size: 14px;
    color: #757575;
    cursor: pointer;
  }

}
</style>