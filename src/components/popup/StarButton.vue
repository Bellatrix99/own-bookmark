<template>
  <div>
    <button id="star-btn" @click="handleToggleStarPage">
      <img src="@/assets/star.svg" alt="star-icon">
    </button>
  </div>
</template>

<script>

export default {
  name: "StarButton",
  data() {
    return {
      showStarPage: false
    }
  },
  methods: {
    handleToggleStarPage() {
      this.showStarPage = !this.showStarPage;
      this.$emit("ToggleStarPage", this.showStarPage);
    }
  }
}
</script>

<style scoped lang="scss">
button {
  outline: none;
  border: none;
  cursor: pointer;
  transition: all .5s;
}

#star-btn {
  overflow: hidden;
  display:block;
  margin:0 auto;
  height: 40px;
  width: 40px;
  padding: 10px;
  border: none;
  border-radius: 50%;
  background-color: var(--star-btn-color);

  img {
    height: 100%;
    line-height: 100%;
  }

  &:hover {
    background-color: #ffbf29;
  }
}

</style>