import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    resume: {
      resume_title: "",
      resume_template: "",
      job_title: "",
      photo_url: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      dob: "",
      pd_city: "",
      summary: "",
    },
  },
  mutations: {
    setFieldValue(state, payload) {
      state.resume[payload.fieldId] = payload.value;
    },
    setNewMultiRecord(state, payload) {
      // Filter out btn field
      const fields = payload.sectionSchema.fields
        .filter((f) => f.id.indexOf("btn") === -1)
        .map((f) => f.id);
      let data = [];
      // Single valued fields e.g. skill:
      if (fields.length == 1) {
        // eslint-disable-next-line prettier/prettier
        data = state.resume[fields[0]]
          .split(",")
          .filter((x) => x.trim() !== "");
        // First value
        if ((state.resume[payload.sectionSchema.id] || []).length === 0) {
          Vue.set(state.resume, payload.sectionSchema.id, data);
        }
        // Subsequent value
        else state.resume[payload.sectionSchema.id].push(...data);
      } else {
        // Mutli valued fields e.g. Education details:
        fields.forEach((f) => {
          if (!state.resume[f]) {
            return;
          }
          data[f] = state.resume[f];
        });
        // First value
        if ((state.resume[payload.sectionSchema.id] || []).length === 0)
          Vue.set(state.resume, payload.sectionSchema.id, [{ ...data }]);
        // Subsequent value
        else {
          let index = state.resume[payload.sectionSchema.id].length;
          Vue.set(state.resume[payload.sectionSchema.id], index, { ...data });
        }
        // state.resume[payload.sectionSchema.id].push({ ...data });
      }
      // delete unused props, until next time!
      fields.forEach((f) => {
        delete state.resume[f];
      });
    },
    updateMultiRecord(state, payload) {
      state.resume[payload.sectionSchema.id][payload.index][payload.fieldId] =
        payload.value;
      payload.sectionSchema.fields.forEach((f) => {
        delete state.resume[f.id];
      });
    },
    deleteMultiRecord(state, payload) {
      state.resume[payload.id].splice(payload.index, 1);
    },
    setStoreValues(state, payload) {
      state.resume = Object.assign({}, payload);
    },
    // eslint-disable-next-line no-unused-vars
    clearStoreValues(state) {
      const customProps = ["id", "created_at", "updated_at", 5, 6, 7, 8];
      customProps.forEach((prop) => {
        delete state.resume[prop];
      });
      state.resume.resume_title = "";
      state.resume.job_title = "";
      state.resume.first_name = "";
      state.resume.last_name = "";
      state.resume.email = "";
      state.resume.phone = "";
      state.resume.dob = "";
      state.resume.pd_city = "";
      state.resume.summary = "";
    },
    setListOrder(state, payload) {
      Vue.set(state.resume, payload.sectionSchema.id, payload.value);
    },
    setResumeTemplate(state, template) {
      state.resume.resume_template = template;
    },
  },
  getters: {
    // eslint-disable-next-line prettier/prettier
    getMultiRecBySecId: (state) => (id) => {
      return state.resume[id] || [];
    },
  },
  actions: {},
  modules: {},
});
