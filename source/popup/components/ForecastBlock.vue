<template>
  <div class="forecast">
    <div class="forecast__title">Прогноз на 3 дня</div>
    <div class="forecast__rows">
      <div v-for="(day, i) in forecastDays" :key="i" class="forecast__day">
        <div class="forecast__day-name">{{ day.dayName }}</div>
        <div class="forecast__info">
          <img :src="day.icon" alt="" class="forecast__icon" />
          <div class="forecast__text">{{ day.text }}</div>
        </div>
        <div class="forecast__temp">{{ day.mintemp }}°/{{ day.maxtemp }}°</div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

export default {
  name: 'ForecastBlock',
  setup() {
    moment.locale('ru')
    const store = useStore()
    const forecast = computed(() => store.state?.forecast?.forecastday)
    const forecastDays = computed(() => {
      return forecast.value.map((el) => ({
        dayName: moment(el.date).format('L'),
        icon: el?.day?.condition?.icon?.replace('//', 'https://'),
        text: el?.day?.condition?.text,
        maxtemp: el?.day?.maxtemp_c,
        mintemp: el?.day?.mintemp_c
      }))
    })
    return { forecastDays }
  }
}
</script>
<style lang="less" scoped>
.forecast {
  color: #ffffff;
  &__title {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    margin-top: 8px;
  }
  &__rows {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }
  &__day {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
  }
  &__icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  &__info {
    display: flex;
    gap: 8px;
  }
  &__day-name {
    justify-self: start;
  }
  &__info {
    justify-self: center;
  }
  &__temp {
    justify-self: end;
  }
}
</style>
