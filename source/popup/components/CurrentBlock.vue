<template>
  <div class="current">
    <div class="current__location">
      {{ location.tz_id }}
    </div>
    <div class="current__top">
      <img :src="icon" class="current__image" />
      <div>
        <div class="current__day">{{ day }}</div>
        <div class="current__temp">{{ current.temp_c }}°</div>
        <div class="current__text">
          {{ condition.text }}
        </div>
      </div>
    </div>
    <div class="current__line" />
    <div class="current__cards">
      <current-mini-card
        v-for="(info, i) in infos"
        :key="i"
        :info="info"
        class="current_card"
      />
    </div>
    <div class="current__line" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import CurrentMiniCard from './CurrentMiniCard.vue'

export default {
  name: 'CurrentBlock',
  components: {
    CurrentMiniCard
  },
  setup() {
    const store = useStore()
    const current = computed(() => store.state.current)
    const forecast = computed(() => store.state.forecast)
    const firstDay = computed(() => forecast?.value?.forecastday?.[0])
    const rainChance = computed(
      () => firstDay?.value?.day?.daily_chance_of_rain
    )
    const condition = computed(() => current.value.condition)
    const icon = computed(() => condition.value.icon.replace('//', 'https://'))
    const day = computed(() => {
      moment.locale('ru')
      const dayName = moment().format('dddd')
      const shortDate = moment().format('L')
      return `${dayName} ${shortDate}`
    })
    const location = computed(() => store.state.location)

    const infos = computed(() => {
      const result = [
        {
          icon: 'windIcon',
          value: `${current.value.wind_kph} км/ч`,
          label: 'Скрость ветра'
        },
        {
          icon: 'rainIcon',
          value: `${rainChance.value} %`,
          label: 'Вероятность дождя'
        },
        {
          icon: 'pressureIcon',
          value: `${current.value.pressure_mb} ммрс`,
          label: 'Давление'
        },
        {
          icon: 'humidityIcon',
          value: `${current.value.humidity} %`,
          label: 'Влажность'
        }
      ]
      return result
    })
    return { current, condition, icon, day, location, infos }
  }
}
</script>

<style scoped lang="less">
.current {
  display: flex;
  flex-direction: column;
  gap: 16px;
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  &__image {
    width: 64px;
    height: 64px;
    object-fit: contain;
  }
  &__text {
    color: #ffffff;
  }
  &__line {
    height: 1px;
    background: #ffffff;
    width: 100%;
  }
  &__temp {
    color: #ffffff;
    font-style: normal;
    font-weight: 600;
    font-size: 72px;
  }
  &__day {
    color: #ffffff;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
  }
  &__location {
    color: #ffffff;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
  }
  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
    justify-content: space-between;
  }
}
</style>
