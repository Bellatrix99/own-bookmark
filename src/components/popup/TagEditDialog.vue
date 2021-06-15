<template>
  <v-dialog
      v-model="display"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="handleCloseDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
            <span class="toolbar-title">
              {{ modeText }}标签
            </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              dark
              text
              @click="handleSaveTag"
          >
            完成
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <v-text-field
              v-model="form.text"
              label="标签"
              :rules="validateRules.text"
              required
              counter="10"
          ></v-text-field>
          <v-text-field
              v-model="form.description"
              label="描述"
          ></v-text-field>
        </v-form>
        <v-btn-toggle>
          <v-btn v-for="color in colorPresets"
                 :key="color"
                 :color="color"
                 x-small
                 @click="() => handleSelectColor(color)"></v-btn>
        </v-btn-toggle>
      </v-container>
      <v-subheader>预览</v-subheader>

      <v-container>
        <v-chip
            class="ma-2"
            :color="form.color || 'primary'"
            text-color="white"
        >
          {{ form.text || UNKNOWN_TAG_TEXT }}
        </v-chip>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { EDIT_MODE_MAPPER, EDIT_MODE_TEXT_MAPPER } from "@/constants/EditType";
import { DEFAULT_COLOR, TagConstants, UNKNOWN_TAG_TEXT } from "@/constants/TagConstants";

const FORM_DEFAULT_STATUS = {
  text: '',
  color: DEFAULT_COLOR,
  description: '',
};

export default {
  name: "TagEditDialog",
  data() {
    return {
      display: false,
      mode: EDIT_MODE_MAPPER.EDIT,
      modeText: EDIT_MODE_TEXT_MAPPER.EDIT,
      form: FORM_DEFAULT_STATUS,
      valid: false,
      UNKNOWN_TAG_TEXT: UNKNOWN_TAG_TEXT,
      colorPresets: TagConstants,
      validateRules: {
        text: [
          (val) => {
            return val ? true : '标题不能为空';
          }
        ]
      }
    }
  },
  methods: {
    handleSelectColor(color) {
      this.form.color = color;
    },
    /**
     * 关闭 Dialog 相关逻辑，分别发送 close 事件，设置 display 状态并清空 dialog 表单
     */
    handleCloseDialog() {
      this.$emit('close');
      this.form = FORM_DEFAULT_STATUS;
      this.display = false;
    },
    /**
     * 点击 Dialog Toolbar 中保存按钮回调，向外发送 save 事件并关闭 Dialog
     */
    handleSaveTag() {
      this.$emit('save', { form: this.form, mode: this.mode })
      this.handleCloseDialog();
    },
    /**
     * 用于外部调用，以创建模式拉起 Dialog
     */
    createTag(text) {
      this.modeText = EDIT_MODE_TEXT_MAPPER.CREATE;
      this.display = true;
      this.form.text = text;
    },
    /**
     * 用于外部调用，以编辑模式拉起 Dialog，根据原标签填充 Dialog 表单
     * @param text { string } 编辑的标签原标题
     * @param color { string } 编辑的标签原色值字符串
     * @param description { string } 编辑的标签原描述
     */
    editTag({ text, color, description }) {
      this.modeText = EDIT_MODE_TEXT_MAPPER.EDIT;
      this.display = true;
      this.form = {
        text, color, description
      };
    },
    /**
     * 展开 / 收起 Dialog，用于内外部调用，默认不传值反转状态
     * @param status { boolean } 要设置的 Dialog 状态，忽略则默认反转
     */
    toggleDialog(status) {
      if (status === undefined) {
        this.display = !this.display;
        return;
      }
      this.display = status;
    }
  }
}
</script>

<style scoped lang="scss">
.toolbar-title {
  font-size: 1.1rem;
  color: white;
}

</style>
