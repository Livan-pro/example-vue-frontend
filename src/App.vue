<template>
  <div class="wrapper">
    <div class="header">
      <router-link
        v-if="prevStep"
        :to="prevStep"
        class="button button_blue header__prev-button"
      >
        <IconRightArrow class="rotate-180" />
        {{ prevLabel }}
      </router-link>
      <div class="header__center">
        <div class="header__step">{{ currentStep }}/{{ totalSteps }}</div>
        <h1 class="header__title">{{ title }}</h1>
      </div>
    </div>
    <div class="body">
      <router-view />
      <router-link
        v-if="nextStep"
        :to="nextStep"
        :aria-disabled="nextDisabled"
        class="body__next-button button button_green"
        :class="{ button_disabled: nextDisabled }"
      >
        {{ nextLabel }}
        <IconRightArrow />
      </router-link>
    </div>
  </div>
</template>

<script>
import IconRightArrow from "./components/icons/RightArrow.vue";

export default {
  components: { IconRightArrow },
  computed: {
    currentStep() {
      return this.$route.meta.step?.number;
    },
    nextDisabled() {
      return (
        this.$route.meta?.step?.nextDisabled &&
        this.$route.meta.step?.nextDisabled(this.$store.state)
      );
    },
    nextStep() {
      return this.$route.meta?.step?.next;
    },
    nextLabel() {
      return this.$route.meta?.step?.nextLabel || "Перейти к следующему шагу";
    },
    prevStep() {
      return this.$route.meta?.step?.prev;
    },
    prevLabel() {
      return this.$route.meta?.step?.prevLabel || "Предыдущий шаг";
    },
    totalSteps() {
      return this.$router.getRoutes().filter((r) => r.meta?.step).length;
    },
    title() {
      return this.$route.meta?.step?.title;
    },
  },
};
</script>