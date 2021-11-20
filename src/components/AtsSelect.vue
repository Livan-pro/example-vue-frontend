<template>
  <div class="ats-select">
    <RadioButton
      v-if="noAtsFirst"
      v-model="selectedItem"
      class="ats-select__no-ats_first"
      text="У меня нет АТС"
      modifier="warn"
      :this-value="0"
      :compact="compactSelect"
    />
    <template v-for="(item, i) in items">
      <div
        v-if="item.type === 'subtitle'"
        :key="i"
        class="ats-select__subtitle"
      >
        {{ item.text }}
      </div>
      <RadioButton
        v-else
        :key="i"
        v-model="selectedItem"
        :text="item.text"
        :this-value="item.id"
        :compact="compactSelect"
      />
    </template>
    <RadioButton
      v-if="!noAtsFirst"
      v-model="selectedItem"
      class="ats-select__no-ats_last"
      text="У меня нет АТС"
      modifier="warn"
      :this-value="-1"
      :compact="compactSelect"
    />
  </div>
</template>



<script>
import { mapState } from "vuex";
import RadioButton from "./RadioButton.vue";

export default {
  components: { RadioButton },
  props: { noAtsFirst: Boolean, compactSelect: Boolean },
  computed: {
    selectedItem: {
      get() {
        return this.$store.state.selectedAts;
      },
      set(val) {
        this.$store.commit("selectAts", +val);
      },
    },
    ...mapState({
      items: (state) =>
        state.atsList
          .sort((a, b) =>
            a.type === b.type ? a.name < b.name : a.type < b.type
          )
          .reduce(
            ({ lastType, list }, item) => {
              if (item.type !== lastType) {
                list.push({ type: "subtitle", text: item.type });
                lastType = item.type;
              }
              list.push({ type: "item", text: item.name, id: item.id });
              return { lastType, list };
            },
            { lastType: "", list: [] }
          ).list,
    }),
  },
};
</script>