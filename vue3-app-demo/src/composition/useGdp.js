import { ref, computed, watch } from 'vue'
import gsap from "gsap";
const colors = ["#334552", "#B34335", "#6E9FA5", "#A2C3AC", "#C8846C"];
export default function useGdp(gdpRef, maxSize) {
  const max = computed(() => {
    if (gdpRef.value.length) {
      return Math.max(...gdpRef.value.map((it) => it.value));
    }
    return 0;
  });
  const bars = ref([]);
  const barsTarget = computed(() => {
    return gdpRef.value.map((it, i) => ({
      ...it,
      color: colors[i % colors.length],
      size: (it.value / max.value) * maxSize
    }))
  })

  watch(barsTarget,
    (newValue) => {
      for (let i = 0; i < newValue.length; i++) {
        if (!bars.value[i]) {
          bars.value[i] = {
            ...newValue[i],
            size: 0,
            value: 0,
          };
        }
        gsap.to(bars.value[i], {
          ...newValue[i],
          duration: 1,
        });
      }
    },
    {
      deep: true,
    }
  );

  return {
    bars
  }
}