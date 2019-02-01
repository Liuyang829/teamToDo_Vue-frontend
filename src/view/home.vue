<template>
    <div class="layout">
        <i-header></i-header>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import IHeader from '@/components/IHeader'
export default {
  components: {
      IHeader
  },
  data() {
      return {}
  }
}
</script>


<style lang="scss" scoped>

</style>

