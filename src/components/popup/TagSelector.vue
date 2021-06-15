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
          :color="item.color"
          text-color="white"
          label
          small
      >
        <span>
        {{ item.text }}
        </span>
      </v-chip>
      <v-spacer></v-spacer>
      <v-list-item-action @click.stop>
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
export default {
  name: "TagSelector",
  data: () => ({
    tagItems: [
      { header: '选择或创建标签' },
      {
        text: 'Foo',
        description: 'aaa',
        color: 'blue',
      },
      {
        text: 'Bar',
        color: 'red',
      },
    ],
    selectedTags: [],
    search: null,
  }),
  watch: {
    async model (val, prev) {
      if (val.length === prev.length) return
      this.model = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
          }
          this.items.push(v)
          this.once++
        }
        return v
      })
    },
  },
  methods: {
    handleEditTag(tag) {
      this.$emit('editTag', { tag });
    },
    handleCreateTag() {
      this.$emit('createTag', { text: this.search });
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
