<template>
  <div class="row main-content">
    <div class="col s12 m6" style="height:90vh;overflow-y:auto">
      <ValidationObserver ref="observer">
        <div slot-scope="{ invalid }">
          <div id="actions">
            <router-link
              to="/"
              style="left:0"
              class="waves-effect waves-default btn-flat floating-button hide-on-small-only"
              ><i class="material-icons left">chevron_left</i>Back</router-link
            >
            <button
              class="btn-flat waves-effect waves-default floating-button hide-on-small-only"
              style="left:42.75%"
              :disabled="invalid"
              v-if="isFormDirty"
              @click="save()"
            >
              <i class="material-icons right">check</i>Save
            </button>
            <span
              class="new badge floating-button hide-on-small-only"
              style="left:42.75%;top:6.4rem"
              v-if="!isFormDirty"
              data-badge-caption="All saved !"
            ></span>
            <button
              class="btn-floating btn-large z-depth-3 waves-effect waves-light float-bottom hide-on-small-only"
              v-if="resumeId"
              @click="deleteResume()"
            >
              <i class="material-icons right">delete</i>
            </button>
          </div>
          <div class="container">
            <br />
            <draggable v-model="sectionList" draggable=".item">
              <div
                class="row item"
                v-for="(section, key) in sectionList"
                :key="key"
              >
                <div class="col s12" v-if="section.name || section.description">
                  <h6>
                    {{ section.name }}
                  </h6>
                  <small class="grey-text lighten-3">{{
                    section.description
                  }}</small>
                </div>
                <CommonInput
                  :field="field"
                  :sectionSchema="section"
                  v-for="(field, key) in section.fields"
                  :key="key"
                  @input="onDirty()"
                />
                <!-- Added records to be listed -->
                <MultiRecordList
                  v-if="section.isMultiRecord"
                  :section="section"
                  @remove="onDirty()"
                  @update="onDirty"
                  @resequence="onDirty()"
                />
              </div>
            </draggable>
            <div class="col s12 center-align">
              <button
                class="btn waves-effect waves-light"
                v-if="isFormDirty"
                :disabled="invalid"
                @click="save()"
              >
                Save
              </button>
            </div>
            <br />
          </div>
        </div>
      </ValidationObserver>
    </div>
    <div
      id="resumeViewContainer"
      class="col s12 m6 valign-wrapper"
      style="background:#7a8599;"
      :style="{ 'overflow-y': resumeViewScrollable ? 'auto' : 'hidden' }"
    >
      <ResumePreview
        scaleX="0.5"
        scaleY="0.4"
        @fullModeActivated="resumeViewScrollable = true"
        @fullModeDeactivated="resumeViewScrollable = false"
        @onTemplateUpdate="onDirty()"
      />
    </div>
  </div>
</template>
<script>
import InputFormSchema from "../model/formSchema.json";
import CommonInput from "../components/core/CommonInput";
import ResumePreview from "../components/core/ResumePreview";
import MultiRecordList from "../components/core/MutiRecord/MultiRecordList";
import STORAGE_SERVICE from "../services/persistence";
import { ValidationObserver } from "vee-validate";
import { orderBy } from "lodash";
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
    CommonInput,
    ResumePreview,
    MultiRecordList,
    ValidationObserver,
  },
  data() {
    return {
      formSchema: {},
      isFormDirty: false,
      resumeViewScrollable: false,
    };
  },
  computed: {
    resumeId() {
      return (this.$route.params || {}).id;
    },
    sectionList: {
      get() {
        return this.formSchema.sections;
      },
      set(val) {
        this.formSchema.sections = val;
        let schemaOrder = [];
        for (let index = 0; index < this.formSchema.sections.length; index++) {
          schemaOrder[this.formSchema.sections[index]["id"]] = index;
        }
        STORAGE_SERVICE.saveSchema(schemaOrder);
      },
    },
  },
  mounted() {
    document.body.style.overflowY = "hidden";
    this.formSchema = InputFormSchema;
    if (this.$route.params.id) {
      const formData = STORAGE_SERVICE.getResumeById(this.$route.params.id);
      if (!formData) {
        this.$router.push("/404");
        return;
      }
      this.$store.commit("setStoreValues", formData);
      const schemaOrder = STORAGE_SERVICE.getSchemaOrder();
      this.formSchema.sections.forEach((s) => {
        s.seq = schemaOrder ? schemaOrder[s.id] : 0;
        s.fields.forEach((f) => {
          f.value = formData[f.id];
        });
      });
      this.formSchema.sections = orderBy(this.formSchema.sections, ["seq"]);
    } else {
      this.$store.commit("clearStoreValues");
      this.formSchema.sections.forEach((s) => {
        s.fields.forEach((f) => {
          f.value = "";
        });
      });
    }
  },
  beforeDestroy() {
    document.body.style.overflowY = "auto";
  },
  methods: {
    save() {
      STORAGE_SERVICE.saveResume(this.$store.state.resume);
      this.isFormDirty = false;
      if (!this.resumeId) {
        this.$store.commit("clearStoreValues");
        this.$router.push("/");
      }
    },
    deleteResume() {
      if (confirm("Are you sure?")) {
        STORAGE_SERVICE.deleteResume(this.resumeId);
        this.$router.push("/");
      }
    },
    onDirty() {
      this.isFormDirty = true;
    },
  },
};
</script>
<style scoped>
.row {
  margin-bottom: 0.85rem;
}
.col {
  margin-bottom: 0.25rem;
}
.main-content > .col.m6 {
  max-height: 95vh;
  overflow-y: auto;
}
h6 {
  font-weight: 600;
  cursor: move;
}
.pullup {
  margin-top: 0.3rem;
}
.floating-button {
  position: absolute;
  top: 6rem;
  font-weight: 600;
}
.float-bottom {
  position: absolute;
  bottom: 1.5rem;
  left: 45%;
}
body {
  overflow-y: hidden;
}
.item:active {
  cursor: move;
  padding: 0.45em 0.5rem;
  border-radius: 8px;
  background: #f7f7f7;
  transition-delay: 0.1s;
  transition-duration: 0.25s;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
}
</style>
