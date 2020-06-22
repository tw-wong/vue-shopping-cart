<template>
  <div class="row float-right clearfix">
    <span class="font-weight-bold">Total amount:&nbsp;</span> {{ currency +' '+ total_price }}
  </div>
</template>

<script>
export default {
  name: 'CheckOut',
  props: {
    currency: {
      type: String,
      required: true
    },
    total_price: {
      type: String,
      required: true
    },
  },
}
</script>

