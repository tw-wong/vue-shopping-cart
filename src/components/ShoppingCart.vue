<template>
    <div class="row">
    <table class="table table-bordered table-hover">
        <thead class="thead-dark">
            <tr>
                <th scope="col">
                    <input 
                    type="checkbox" 
                    :id="'check_all'" 
                    :checked="is_checked_all"
                    name="check_box_all" 
                    v-on:change="check_all_item($event.target.checked)"/>
                </th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in list"
            v-if="!item.is_deleted"
            is="cart-item"
            :currency="currency"
            :index="index"
            :id="item.id"
            :name="item.name"
            :image="item.image"
            :price="item.price"
            :quantity="item.quantity"
            :is_checked="item.is_checked"
            >
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
import { EventBus } from '../EventBus.js'
import CartItem from '../components/CartItem.vue'

export default {
  name: 'ShoppingCart',
  components: {
    CartItem
  }, 
  props: {
    list: {
        type: Array, 
        required: true
    },
    currency: {
        type: String, 
        required: true
    }, 
  }, 
  data(){
    return {
        is_checked_all: false,
    }
  }, 
  methods: {
    check_all_item(checked) {
        //console.log('method check_all_item checked:%s', checked);
        this.is_checked_all = checked;
        EventBus.$emit('check-all-item', this.is_checked_all);
    }
  },
}
</script>

