<template>
  <div class="bookmark-filter-content">
    <h1>书签管理器</h1>
    <div class="bookmark-filter-input">
      <div class="icon">
        <img src="../../assets/icon.png" alt="input-icon">
      </div>
      <input type="text" placeholder="搜索书签或标签">
    </div>
  </div>
</template>

<script>
export default {
  name: "BookMarkFilter",
  methods: {

  }
}
</script>

<style scoped lang="scss">
.bookmark-filter-content {
  width: 60%;
  margin: 90px auto;

  h1 {
    text-align: center;
    color: white;
    font-weight: 300;
    font-size: 30px;
    margin-bottom: 30px;
    text-shadow: 1px 2px 8px #674611;
  }

  .bookmark-filter-input {
    transition: all .5s;
    display: flex;
    justify-content: center;
    height: 50px;
    padding: 0 20px;
    background-color: rgba(255, 255, 255, 0.94);
    box-shadow: 2px 2px 10px #e38c00;
    border-radius: 50px;

    &:hover {
      box-shadow: 8px 8px 12px rgba(0, 0, 0, .3);
    }
  }

  .icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 25px;
    height: 50px;
    margin-right: 10px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  input {
    font-size: 15px;
    margin-right: 15px;
    min-width: 100px;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
  }
}


</style>