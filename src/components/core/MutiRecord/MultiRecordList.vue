<template>
  <div class="col s12">
    <!-- Employment history -->
    <ul class="collection" v-if="sectionId === 5 && listItems.length > 0">
      <li
        v-for="(item, index) in listItems"
        :key="index"
        class="collection-item"
      >
        <div class="col s12">
          {{ item.employment_history_job_title }} at {{ item.employer }}
        </div>
        <small class="grey-text lighten-2">{{ item.start_date }}</small>
        <MultiRecordActions
          :index="index"
          :editIndex="editIndex"
          @delete="removeMultiRecord(section, index)"
          @edit="editMultiRecord(index)"
          @close="onClose()"
        />
        <!-- Render the edit section -->
        <MultiRecordSection
          :index="index"
          :section="section"
          v-if="editIndex === index"
        />
      </li>
    </ul>
    <!-- Education multi records -->
    <ul class="collection" v-if="sectionId === 6 && listItems.length > 0">
      <li
        v-for="(item, index) in listItems"
        :key="index"
        class="collection-item"
      >
        <div class="col s12">{{ item.degree }} at {{ item.school }}</div>
        <small class="grey-text lighten-2">{{ item.school_start_date }}</small>
        <MultiRecordActions
          :index="index"
          :editIndex="editIndex"
          :sectionName="section.name"
          @delete="removeMultiRecord(section, index)"
          @edit="editMultiRecord(index)"
          @close="onClose()"
        />
        <!-- Render the edit section -->
        <MultiRecordSection
          :index="index"
          :section="section"
          v-if="editIndex === index"
        />
      </li>
    </ul>
    <!-- Skills' multi records -->
    <div v-if="sectionId === 7">
      <br />
      <draggable v-model="listItems" draggable=".item">
        <div
          class="chip item"
          v-for="(item, index) in listItems"
          :key="index"
          @drag="onDrag()"
        >
          {{ item }}
          <i class="material-icons" @click="removeMultiRecord(section, index)"
            >close</i
          >
        </div>
      </draggable>
    </div>
    <!-- Links' multi records -->
    <div v-if="sectionId === 8">
      <br />
      <draggable v-model="listItems" draggable=".item">
        <div
          class="chip item"
          v-for="(item, index) in listItems"
          :key="index"
          @drag="onDrag()"
        >
          <a :href="item.link" target="_blank">
            {{ item.label }}
          </a>
          <i class="material-icons" @click="removeMultiRecord(section, index)"
            >close</i
          >
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import MultiRecordSection from "../MutiRecord/MultiRecordSection";
import MultiRecordActions from "../MutiRecord/MultiRecordActions";
import draggable from "vuedraggable";

export default {
  props: {
    section: Object,
  },
  components: {
    draggable,
    MultiRecordSection,
    MultiRecordActions,
  },
  data() {
    return {
      editIndex: -1,
      draggedFieldSection: {},
    };
  },
  computed: {
    listItems: {
      get: function() {
        return this.$store.getters.getMultiRecBySecId(this.sectionId);
      },
      set: function(val) {
        this.$store.commit("setListOrder", {
          sectionSchema: this.draggedFieldSection,
          value: val, //all values in new order
        });
        this.$emit("remove");
      },
    },
    sectionId() {
      return this.section.id;
    },
  },
  methods: {
    editMultiRecord(index) {
      this.editIndex = index;
    },
    removeMultiRecord(section, index) {
      if (section.deleteConfirmationRequired && !confirm("Are you sure?")) {
        return;
      }
      this.$store.commit("deleteMultiRecord", {
        id: section.id,
        index: index,
      });
      this.$emit("remove");
    },
    onDrag() {
      this.draggedFieldSection = this.section;
    },
    onClose() {
      this.editIndex = -1;
      this.$emit("update");
    },
  },
  watch: {
    listItems: {
      deep: true,
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler(newVal, oldval) {
        // console.log(newVal, oldval);
      },
    },
  },
};
</script>
<style scoped>
span.badge {
  float: left;
  margin-top: 1rem;
}
.col.s12 {
  padding: 0;
}
.chip {
  cursor: grab;
}
.chip > i {
  cursor: pointer;
  float: right;
  font-size: 16px;
  line-height: 32px;
  padding-left: 8px;
  color: #aaa;
}
</style>
