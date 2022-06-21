<template>
  <div class="card">
    <component :is="info.icon" class="card__icon" />
    <div class="card__right">
      <div class="card__value">
        {{ info.value }}
      </div>
      <div class="card__label">
        {{ info.label }}
      </div>
    </div>
  </div>
</template>
<script>
import windIcon from '~/shared/svg/wind-icon.vue'
import pressureIcon from '~/shared/svg/pressure-icon.vue'
import rainIcon from '~/shared/svg/rain-icon.vue'
import humidityIcon from '~/shared/svg/humidity-icon.vue'

export default {
  name: 'CurrentMiniCard',
  components: {
    windIcon,
    humidityIcon,
    pressureIcon,
    rainIcon
  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="less" scoped>
.card {
  display: flex;
  align-items: center;
  height: 32px;
  gap: 4px;
  &__right {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #ffffff;
  }
}
</style>
