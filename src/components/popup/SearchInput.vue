<template>
  <div class="search-box" @click="handleToggleExpand">
    <label :class="{'search-input-up': showAnimate}">
      <input type="text" id="search" name="search" placeholder="搜索标签或书签" autocomplete="off"
             @input="renderBookmark" v-model="searchInputValue">
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
      searchInputValue: "",
      showAnimate: false
    }
  },
  methods: {
    handleToggleExpand(e) {
      // 子组件可以使用 $emit 触发父组件的自定义事件
      // 第二参数是传给父组件的值
      // 父组件监听事件时，可以通过 $event 访问这个被抛出的值
      // console.log(this.expanded);
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
.search-input-down {
  animation: down .5s;
}

.search-input-up {
  animation: up .5s;
}

@keyframes up {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-50px);
  }

  100% {
    transform: translateY(-100px);
  }
}

@keyframes down {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(100px);
  }

  100% {
    transform: translateY(0px);
  }
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
    height: 20px;
    margin-left: 10px;
    color: #757575;
    transition: all .5s;
    cursor: pointer;
  }
}
</style>