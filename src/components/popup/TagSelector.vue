<template>
  <!--展示-->
  <v-combobox
      v-model="selectedTags"
      :filter="filterTags"
      :hide-no-data="!search"
      :items="tagItems"
      :search-input.sync="search"
      hide-selected
      label="标签"
      multiple
      prepend-inner-icon="mdi-tag"
  >
    <template v-slot:no-data>
      <v-list-item @click="handleCreateTag" dense>
        <span class="subheading">
          <span class="mr-2">
            创建标签
          </span>
          <v-chip
              color="success"
              text-color="white"
              small
              label
          >
            {{ search }}
          </v-chip>
        </span>
      </v-list-item>
    </template>
    <!-- Selection Slot 展示被选中的标签 Chips 在输入框内-->
    <template v-slot:selection="{ attrs, item, parent, selected }">
      <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="item.color"
          :input-value="selected"
          text-color="white"
          label
          small
      >
          <span class="pr-2">
            {{ item.text }}
          </span>
        <v-icon
            small
            @click="parent.selectItem(item)"
        >
          mdi-close
        </v-icon>
      </v-chip>
    </template>
    <template v-slot:item="{ index, item }">
      <v-chip
          class="mr-2 flex-shrink-0"
          :color="item.color"
          text-color="white"
          label
          small
      >
        {{ item.text }}
      </v-chip>
      <span class="text-truncate" v-if="item.description">
        {{ item.description }}
      </span>
      <v-spacer></v-spacer>
      <v-list-item-action @click.stop class="flex-shrink-0">
        <v-btn
            icon
            @click.stop.prevent="handleEditTag(item)"
        >
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-list-item-action>
    </template>
  </v-combobox>
</template>

<script>
// FIXME: v-list 下拉项较长时遮挡其他元素
import { fetchAllTags } from "@/mock/popup";

export default {
  name: "TagSelector",
  data: () => ({
    tagItems: [],
    selectedTags: [],
    search: null,
  }),
  watch: {
    /**
     * 按下 Enter 键后，Combobox 会将 search push 至 v-model 绑定的数组中
     * @param val
     * @param prev
     * @return {Promise<void>}
     */
    async selectedTags(val, prev) {
      // 如果空值情况下按下的 enter ，则无需操作
      if (val.length === prev.length) return;
      // 遍历 v-model 绑定数组
      this.selectedTags = val.map(selectedTag => {
        // 如果遇到由 Combobox 默认行为产生的 String 项，尝试将其转换为 Tag 对象再加入到 v-model 数组中
        if (typeof selectedTag === 'string') {
          // 在已经创建的 Tags 中查找，如果找到则添加至 v-model 数组中
          const tag = this.tagItems.find(t => t.text === selectedTag);
          if (tag) {
            return tag;
          }
          console.log('create', JSON.stringify(tag), JSON.stringify(this.selectedTags));
          // 否则创建标签
          this.handleCreateTag(selectedTag);
        }
        return selectedTag;
      }).filter(tag => (tag instanceof Object));
    },
  },
  created() {
    this.fetchAllTags();
  },
  methods: {
    async fetchAllTags() {
      this.tagItems = await fetchAllTags();
    },
    handleEditTag(tag) {
      this.$emit('editTag', { tag });
    },
    handleCreateTag(search) {
      this.$emit('createTag', { text: typeof search === 'string' ? search : this.search });
    },
    reloadTagOptions() {
      this.fetchAllTags();
    },
    /**
     * 对外使用的接口，向 v-model 绑定的数组中添加 Tag
     * @param tag { Object } Tag
     */
    appendSelectedTag(tag) {
      if (tag instanceof Object) {
        this.selectedTags.push(tag);
      }
    },
    filterTags(item, queryText, itemText) {
      if (item.header) return false
      const hasValue = val => val != null ? val : ''
      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
    },
  },
}
</script>


<style lang="scss" scoped>

</style>
