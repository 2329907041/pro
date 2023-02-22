<template>
  <div class="dashboard-container">
   <card></card>
   <sale></sale>
<showsearch></showsearch>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import card from './card'
import sale from './sale'
import showsearch from './showsearch'
export default {
  name: 'Dashboard',
  components: {
    card, 
    sale,
    showsearch,
  },
  mounted() {
    console.log('1234')
    this.$store.dispatch('getdata');
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
