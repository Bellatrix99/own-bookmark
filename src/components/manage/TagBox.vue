<template>
  <div class="tag-box">
    <div class="tag draggableTag">Docker</div>
    <div class="tag draggableTag">C++</div>
    <div class="tag draggableTag">Java</div>
    <div class="tag draggableTag">JavaScript</div>
  </div>
</template>

<script>
export default {
  name: "TagBox"
}
</script>

<style scoped lang="scss">
.tag-box {
  padding: 30px;
  text-align: center;
  background-color: white;
  box-shadow: 0 3px 5px rgba(226, 226, 226, 82%);

  .draggableTag {
    cursor: grab;
    -webkit-user-drag: element;
    -webkit-user-select: none;
    user-select: none;
  }
}
</style>