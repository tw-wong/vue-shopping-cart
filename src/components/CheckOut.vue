<template>
  <div class="row float-right clearfix">
    <span class="font-weight-bold">Total amount:&nbsp;</span> {{ currency +' '+ total_price }}
  </div>
</template>

<script>
// import { EventBus } from '../EventBus.js'

export default {
  name: 'CheckOut',
  props: {
    currency: String,
    total_price: String,
  },
}
</script>

