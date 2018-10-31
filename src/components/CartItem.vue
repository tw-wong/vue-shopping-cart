<template>
    <tr>
        <th scope="row">
            <input 
            type="checkbox" 
            :id="'check_'+index" 
            :checked="is_checked"
            name="check_box" 
            v-on:change="check_item(index, $event.target.checked)"/>
        </th>
        <td>
            <span class="px-2"><img src="https://via.placeholder.com/40" /></span>
            <span>{{ name }}</span>
        </td>
        <td> {{ currency + ' ' + price.toFixed(2) }}</td>
        <td>

        <div style="width: 150px; margin: 0 auto; border: 0px solid red;">
        <div class="input-group">
          <span class="input-group-btn px-2">
              <button type="button" class="btn btn-default btn-number" @click="update_quantity(index, 'minus')" :disabled="minus_disabled">
                  <span class="octicon octicon-diff-removed">-</span>
              </button>
          </span>            
          <input type="text" class="form-control input-number" :value="quantity" readonly="readonly" style="text-align: center">

          <span class="input-group-btn px-2">
              <button type="button" class="btn btn-default btn-number" @click="update_quantity(index, 'plus')" :disabled="plus_disabled">
                  <span class="glyphicon glyphicon-plus">+</span>
              </button>
          </span>
        </div>
        </div>

        </td>
        <td> {{ sub_total }}</td>
        <td><button type="button" class="btn btn-secondary" @click="delete_item(index)">Remove item</button></td>
    </tr>
</template>

<script>
import { EventBus } from '../EventBus.js'

export default {
  name: 'CartItem',
  props: {
    currency: String, 
    index: Number,
    id: Number,
    name: String, 
    image: String, 
    price: Number, 
    quantity: Number,
    is_checked: Boolean,
  }, 
  data() {
    return {
        minus_disabled: false, 
        plus_disabled: false, 
    }
  }, 
  methods: {
    check_item(index, checked){
        //console.log('check_item: index:%s, checked:%s', index, checked);
        EventBus.$emit('check-item', index, checked);
    }, 
    update_quantity(index, type){
        //console.log('update_quantity: index:%s, type:%s, quantity:%s', index, type, this.quantity);
        if(this.quantity){
            EventBus.$emit('update-quantity', index, type);
        }
    },
    delete_item(index){
        //console.log('delete_item: index:%s', index);
        EventBus.$emit('delete-item', index);
    }
  }, 
  created() {
    if(this.quantity == 1){
        this.minus_disabled = true;
    }
    else {
        this.minus_disabled = false;
    }
  }, 
  updated() {
    if(this.quantity == 1){
        this.minus_disabled = true;
    }
    else {
        this.minus_disabled = false;
    }
  }, 
  computed: {
    sub_total() {
        let subTotal = this.quantity * this.price;
        return this.currency + ' ' + subTotal.toFixed(2);
    }
  }
}
</script>

