<template>
  <div>
    <ul class="collection z-depth-4">
      <li class="collection-header">
        <small style="color:#9e9e9e;margin-left:1.35rem;padding:1rem 0;"
          >Choose a theme</small
        >
      </li>
      <div v-for="(color, index) in colorOptions" :key="index">
        <li
          :class="{ disabled: theme.name === color.name }"
          disabled
          class="collection-item"
          @click="
            switchTheme(color);
            saveTheme(color);
          "
        >
          <div>
            <a class="secondary-content"
              ><i class="material-icons" :style="{ color: color.color }"
                >brightness_1</i
              ></a
            >{{ color.name | capitalize }}
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import STORAGE_SERVICE from "../../services/persistence";

export default {
  data() {
    return {
      colorOptions: [
        {
          name: "indigo",
          color: "#4a148c",
        },
        {
          name: "pink",
          color: "#e91e63",
        },
        {
          name: "dark",
          color: "#1f1f1f",
        },
      ],
    };
  },
  computed: {
    ...mapState(["theme"]),
    theme() {
      return this.$store.state.theme || { name: "indigo" };
    },
  },
  methods: {
    ...mapMutations(["switchTheme"]),
    saveTheme(color) {
      STORAGE_SERVICE.saveTheme(color);
    },
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
<style scoped>
i {
  font-size: 30px;
  margin-top: -0.25rem;
}
.collection {
  position: fixed;
  width: 15rem;
  right: 1rem;
  z-index: 1000;
  top: 3.25rem;
}
.collection .collection-item:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.2);
}
.disabled {
  background: none;
  opacity: 0.5;
}
</style>
