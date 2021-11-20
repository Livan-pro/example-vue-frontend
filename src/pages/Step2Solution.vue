<template>
  <div>
    <div class="results">
      <div>
        <span class="results__label">Модель АТС:</span>
        <button class="results__model" @click="openModelSelect">
          {{ selectedAtsName }}
          <IconChevronLeft />
        </button>
        <div v-if="modelSelect" class="results__model-select-container">
          <div
            class="results__model-select-overlay"
            @click="closeModelSelect"
          />
          <div class="results__model-select">
            <div class="results__model-select__triangle">
              <IconModalTriangle />
            </div>
            <AtsSelect :compact-select="true" />
          </div>
        </div>
      </div>
      <div>
        <span class="results__label">Программа 1С:</span> Управление нашей
        фирмой
      </div>
      <div v-if="solution">
        <span class="results__label">Подходящие решения:</span>
        {{ solution.name }}
      </div>
    </div>
    <div v-if="solution" class="solution-title">{{ solution.name }}</div>
    <div v-if="solution" class="solution-functions">
      <div class="solution-supported">
        <div class="solution-functions__label solution-supported__label">
          Поддерживаемые функции:
        </div>
        <ul class="solution-functions__list solution-supported__list">
          <li
            v-for="(item, i) in solution.supported"
            :key="i"
            class="solution-functions__item"
          >
            <div class="checkmark checkmark_light solution-functions__icon">
              <IconCheckmark />
            </div>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <div class="solution-unsupported">
        <div class="solution-functions__label solution-unsupported__label">
          Неподдерживаемые функции:
        </div>
        <ul class="solution-functions__list solution-unsupported__list">
          <li
            v-for="(item, i) in solution.unsupported"
            :key="i"
            class="solution-functions__item"
          >
            <div class="cross solution-functions__icon">
              <IconCross />
            </div>
            <span>
              {{ item }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <hr class="body__hr" />
    <span class="solution__links-label">Ссылки на инструкции:</span>
    <a class="solution__link" href="#" target="_blank">
      <IconExternalLink />&nbsp; Инструкция к АТС Mango
    </a>
    <a class="solution__link" href="#" target="_blank">
      <IconExternalLink />&nbsp; Инструкция к АТС Яндекс
    </a>
    <a class="solution__link" href="#" target="_blank">
      <IconExternalLink />&nbsp; Инструкция к АТС iToolabs
    </a>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AtsSelect from "../components/AtsSelect.vue";
import IconCheckmark from "../components/icons/Checkmark.vue";
import IconCross from "../components/icons/Cross.vue";
import IconExternalLink from "../components/icons/ExternalLink.vue";
import IconChevronLeft from "../components/icons/ChevronLeft.vue";
import IconModalTriangle from "../components/icons/ModalTriangle.vue";

export default {
  components: {
    AtsSelect,
    IconCheckmark,
    IconCross,
    IconExternalLink,
    IconChevronLeft,
    IconModalTriangle,
  },
  data: () => ({
    modelSelect: false,
    lastAts: null,
  }),
  computed: {
    ...mapState({
      selectedAtsName: (state) =>
        state.atsList.find((ats) => ats.id === state.selectedAts)?.name,
      solution: "solution",
    }),
  },
  created() {
    this.loadSolution();
  },
  methods: {
    openModelSelect() {
      this.modelSelect = true;
      this.lastAts = this.$store.state.selectedAts;
    },
    closeModelSelect() {
      this.modelSelect = false;
      if (this.lastAts !== this.$store.state.selectedAts) this.loadSolution();
    },
    ...mapActions(["loadSolution"]),
  },
};
</script>