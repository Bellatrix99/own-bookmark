<template>
  <div class="star-page">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
              cols="12"
          >
            <v-text-field
                v-model="form.title"
                :rules="validations.title"
                label="标题"
                hide-details="auto"
                prepend-inner-icon="mdi-format-title"
                clearable
                required
            >
            </v-text-field>
          </v-col>

          <v-col
              cols="12"
          >
            <!--TODO: 描述抓 Meta 中的 SEO 关键词-->
            <v-text-field
                v-model="form.description"
                label="描述"
                hide-details="auto"
                prepend-inner-icon="mdi-pen"
                clearable
                required
            >
            </v-text-field>
          </v-col>

          <v-col
              cols="12"
          >
            <TagSelector
                ref="tagSelector"
                @createTag="handleCreateTag"
                @editTag="handleEditTag"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <div class="operate-group">
      <v-btn
          depressed
          color="primary"
          @click="handleStoreBookmark"
      >
        添加
      </v-btn>
      <v-btn
          depressed
          @click="handleClose"
      >
        取消
      </v-btn>
    </div>
    <TagEditDialog ref="editDialog" @save="handleSaveTag"/>
  </div>
</template>

<script>

import TagSelector from "@/components/popup/TagSelector";
import TagEditDialog from "@/components/popup/TagEditDialog";
import { storeTag } from "@/mock/popup";

export default {
  name: "StarPage",
  components: { TagEditDialog, TagSelector },
  data() {
    return {
      valid: false,
      form: {
        title: '',
        description: '',
        tags: []
      },
      validations: {
        title: [
          (val) => {
            return val ? true : '标题不能为空';
          }
        ],
      },
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    async handleSaveTag({ form, mode }) {
      // TODO: Save Tags
      await storeTag(form);
      const tagSelector = this.$refs.tagSelector;
      await tagSelector.fetchAllTags();
      tagSelector.appendSelectedTag(form);
    },
    /**
     * 关闭 StarPage 并返回
     */
    handleClose() {
      this.$emit("close");
    },
    handleStoreBookmark() {
      this.$emit("store", { form: this.form });
    },
    /**
     * 监听 TagSelector 的 CreateTag 事件回调函数，弹出修改 Dialog
     * @param text { string } 要创建的 Tag 标题
     */
    handleCreateTag({ text }) {
      this.$refs.editDialog.createTag(text);
    },
    handleEditTag({ tag }) {
      console.log(tag);
      this.$refs.editDialog.editTag(tag);
    }
  },
}

</script>

<style scoped lang="scss">

.star-page {
  padding: 0 20px;

  ::v-deep {

    .v-input__icon--prepend-inner {
      margin-right: 8px;
    }
  }

  .operate-group {
    padding: 0 10px;

    button {
      &:first-child {
        float: right;
      }
    }
  }
}

</style>
