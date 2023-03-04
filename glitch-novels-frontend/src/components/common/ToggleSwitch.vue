<template>
  <label
    :for="id"
    class="wrapper relative inline-block h-[24px] w-[44px] cursor-pointer rounded-full bg-gold-brand-2"
    :style="{ backgroundColor: switchStyle.backgroundColor }"
    :class="{ enable }"
  >
    <input
      type="checkbox"
      :name="id"
      :id="id"
      v-model="enable"
    />
    <span
      class="slider absolute top-[2px] left-[2px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white"
      :style="{ color: switchStyle.color }"
    >
      <i :class="switchStyle.icon"></i>
    </span>
  </label>
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import { object, string } from "yup";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  switchStyle: {
    type: Object,
    required: false,
    default: () => ({
      onStyle: {
        icon: "fa-sharp fa-regular fa-check fa-sm",
        color: "#45C391",
        bgColor: "#45C391",
      },
      offStyle: {
        icon: "fa-sharp fa-solid fa-xmark",
        color: "#EA6853",
        bgColor: "#EA6853",
      },
    }),
    validator(value) {
      const schema = object({
        onStyle: object({
          icon: string().required(),
          color: string().required(),
          bgColor: string().required(),
        }),
        offStyle: object({
          icon: string().required(),
          color: string().required(),
          bgColor: string().required(),
        }),
      });

      try {
        schema.validate(value);
        return true;
      } catch (error) {
        console.warn(error.errors);
        return false;
      }
    },
  },
});

const enable = computed({
  get() {
    return props.modelValue;
  },
  set(isEnabled) {
    emit("update:modelValue", isEnabled);
  },
});
const switchStyle = reactive({});
watch(
  enable,
  (isEnable) => {
    const activeStyle = isEnable ? "onStyle" : "offStyle";

    switchStyle.icon = props.switchStyle[activeStyle].icon;
    switchStyle.color = props.switchStyle[activeStyle].color;
    switchStyle.backgroundColor = props.switchStyle[activeStyle].bgColor;
  },
  { immediate: true }
);
</script>

<style scoped>
input {
  display: none;
}

.slider {
  transition: 0.25s;
}

.wrapper {
  transition: 0.25s;
}

.wrapper.enable > .slider {
  transform: translateX(20px);
}
</style>
