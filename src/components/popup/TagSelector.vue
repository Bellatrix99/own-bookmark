<template>
<!--展示-->
  <v-combobox
      v-model="model"
      :filter="filterTags"
      :hide-no-data="!search"
      :items="items"
      :search-input.sync="search"
      hide-selected
      label="标签"
      multiple
      prepend-inner-icon="mdi-tag"
  >
    <template v-slot:no-data>
      <v-list-item @click="handleCreateTag" dense>
        <span class="subheading">
          创建标签
          <v-chip
              :color="`${colors[nonce - 1]} lighten-3`"
              label
              small
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
          :color="`${item.color} lighten-3`"
          :input-value="selected"
          label
          small
          dark
      >
          <span class="pr-2">
            {{ item.text }}
          </span>
        <v-icon
            small
            dark
            @click="parent.selectItem(item)"
        >
          mdi-close
        </v-icon>
      </v-chip>
    </template>
    <template v-slot:item="{ index, item }">
      <v-chip
          :color="`${item.color} lighten-3`"
          dark
          label
          small
      >
        {{ item.text }}
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
    activator: null,
    attach: null,
    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    editing: null,
    editingIndex: -1,
    items: [
      {
        text: 'Foo',
        color: 'blue',
      },
      {
        text: 'Bar',
        color: 'red',
      },
    ],
    nonce: 1,
    menu: false,
    model: [
      {
        text: 'Foo',
        color: 'blue',
      },
    ],
    x: 0,
    search: null,
    y: 0,
  }),

  watch: {
    model(val, prev) {
      if (val.length === prev.length) return
      this.model = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }
          this.items.push(v)
          this.nonce++
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
      this.$emit('createTag', { label: this.search });
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
::v-deep {
  .v-list-item {
    //min-height: unset !important;
    //max-height: 32px;
  }
}
</style>
