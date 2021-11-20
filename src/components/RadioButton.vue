<template>
  <label
    class="radio"
    :class="{
      radio_active: thisValue === value,
      ...(modifier ? { [`radio_${modifier}`]: true } : {}),
    }"
  >
    <span
      class="radio__text"
      aria-hidden="true"
      :class="{ radio__text_compact: compact }"
    >
      {{ text }}
      <div
        v-if="!compact"
        class="checkmark radio__checkmark"
        :class="{ radio__checkmark_active: thisValue === value }"
      >
        <IconCheckmark />
      </div>
    </span>
    <input
      :value="thisValue"
      :checked="thisValue === value"
      type="radio"
      @input="$emit('input', $event.target.value)"
      @click="onClick"
    />
  </label>
</template>

<script>
import IconCheckmark from "./icons/Checkmark.vue";

export default {
  components: { IconCheckmark },
  props: {
    value: { type: null, default: "" },
    text: { type: String, default: "" },
    modifier: { type: null, default: false },
    thisValue: { type: null, default: "" },
    compact: Boolean,
  },
  methods: {
    onClick() {
      console.log("radio click", this.thisValue, this.value);
      if (this.thisValue !== this.value) return;
      this.$emit("input", -1);
    },
  },
};
</script>