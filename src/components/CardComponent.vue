<template>
  <div class="d-inline-block col-sm-4 mb-3">
    <b-card
      :title="card.name"
      :img-src="card.thumbnail"
      img-alt="Img"
      img-top
      no-body
      class="shadow-sm position-relative"
    >
      <div class="card-text p-2">
        <div class="mb-1">
          <span class="title">{{card.name}}</span>
        </div>
        <div class="description mb-2">{{card.description}}</div>
        <div class="action-buttons">
          <b-btn @click="openModal(card)" variant="outline-primary" block>Open Service
            <svgicon icon="open-in-new" width="22" height="22" color="#007bff"></svgicon>
          </b-btn>
        </div>
      </div>

      <b-modal
        :ref="`modallg-${card.name}`"
        size="lg"
        :title="card.name"
        hide-footer
        no-close-on-esc
        no-close-on-backdrop
      >
        <div>
          <div>
            <div v-for="(input, index) in card.inputs" :key="index">
              <template v-if="input.type === 'fileUploader'">
                <FilePond
                  :name="`${card.name}-file-uploader`"
                  :ref="`${card.name}-file-uploader`"
                  label-idle="Drop files here..."
                  :allow-multiple="input.props && input.props.allowMultiple"
                  :max-files="input.props && input.props.maxFiles"
                  :accepted-file-types="input.props && input.props.acceptedFileTypes"
                  :allow-file-type-validation="(input.props && input.props.acceptedFileTypes && input.props.acceptedFileTypes.length) ? true : false"
                />
              </template>
              <template v-else-if="input.type === 'checkbox'">
                <b-form-checkbox
                  v-model="form[input.name]"
                  :value="input.props && input.props.value"
                  :unchecked-value="input.props && input.props.uncheckedValue"
                >{{input.displayName}}</b-form-checkbox>
              </template>
              <template v-else>
                <b-form-group :description="input.props && input.props.description">
                  <b-form-input
                    :type="input.type"
                    v-model="form[input.name]"
                    :required="input.props && input.props.required"
                    :placeholder="input.displayName"
                  ></b-form-input>
                </b-form-group>
              </template>
            </div>
          </div>
          <div class="mt-2">
            <b-btn variant="success" @click="submit(card)">Submit</b-btn>
            <b-btn class="float-right" variant="outline-secondary" @click="closeModal(card)">Close</b-btn>
          </div>
        </div>
      </b-modal>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
// IE 11 support
import 'filepond-polyfill';
import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import 'filepond/dist/filepond.min.css';

import '../compiled-icons/open-in-new';
import '../compiled-icons/open-in-app';

const FilePond = vueFilePond(FilePondPluginFileValidateType);

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {}
    };
  },
  components: {
    FilePond
  },
  methods: {
    submit(card) {
      const validFiles = this.getValidFiles(card);

      const formData = new FormData();

      validFiles.forEach(file => {
        formData.append('file', file.file);
      });

      for (let prop in this.form) {
        if (this.form.hasOwnProperty(prop)) {
          formData.append(prop, this.form[prop]);
        }
      }

      if (card.shouldUpload) {
        axios.post(card.serviceEndpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        for (const entry of formData.entries()) {
          console.log(entry);
        }
      }
    },
    getValidFiles(card) {
      const index = card.name + '-file-uploader';

      const files = this.$refs[index][0].getFiles();

      return files;
    },
    openModal(card) {
      console.log('card', `modallg-${card.name}`);
      this.$refs[`modallg-${card.name}`].show();
    },
    closeModal(card) {
      console.log('card', `modallg-${card.name}`);
      this.$refs[`modallg-${card.name}`].hide();
    }
  }
};
</script>

<style scoped>
.title {
  font-weight: 700;
}
</style>
