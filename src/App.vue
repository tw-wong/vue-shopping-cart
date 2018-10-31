<template>
  <div id="app" class="container">
    <div class="row">
        <h1>Shopping cart</h1>
    </div>
    <shopping-cart 
    :list="list"
    :currency="currency"
    ></shopping-cart>

    <check-out 
    :currency="currency"
    :total_price="total_price"></check-out>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
import { EventBus } from './EventBus.js'
import ShoppingCart from './components/ShoppingCart.vue'
import CheckOut from './components/CheckOut.vue'
import FooterBar from './components/FooterBar.vue'

export default {
  name: 'app',
  components: {
    ShoppingCart, 
    CheckOut, 
    FooterBar
  }, 
  data() {
    return {
      list: [
        {
          id: 1, 
          name: 'Item 01 title and short description goes here.', 
          image: 'https://via.placeholder.com/40', 
          price: 10.00, 
          quantity: 1, 
          is_checked: true,
          is_deleted: false
        }, 
        {
          id: 2, 
          name: 'Item 02 title and short description goes here.', 
          image: 'https://via.placeholder.com/40', 
          price: 5.99, 
          quantity: 1, 
          is_checked: false,
          is_deleted: true
        }, 
        {
          id: 3, 
          name: 'Item 03 title and short description goes here.', 
          image: 'https://via.placeholder.com/40', 
          price: 8.99, 
          quantity: 1, 
          is_checked: false,
          is_deleted: false
        }
      ], 
      currency: 'RM',
      total_price: '0',
    }
  }, 
  methods: {
    //Calculate the total price, only item with checked will take into consideration.
    calcTotalPrice(){
      this.total_price = 0;
      for(let index=0; index<this.list.length; index++){
        if(this.list[index].is_deleted == false && this.list[index].is_checked == true){
          let temp_price = this.list[index].price * this.list[index].quantity;
          this.total_price += temp_price;          
        }
      }

      this.total_price = this.total_price.toFixed(2);
      //console.log('calcTotalPrice total_price:%s', this.total_price);
    }
  }, 
  created() {
    //console.log('Root %s created', this.$options.name);
  
    //Event listener: when item checkbox is click
    EventBus.$on('check-item', (index, checked) => {
      //console.log('Eventlistener check-item index:%s, checked:%s', index, checked);
      this.list[index].is_checked = checked;

      this.calcTotalPrice();
    });

    //Event listener: when item quantity is update (minus / plus)
    EventBus.$on('update-quantity', (index, type) => {
      //console.log('Eventlistener update-quantity index:%s, type:%s', index, type);
      if(type == 'plus'){
        this.list[index].quantity += 1;
      }
      else {
        this.list[index].quantity -= 1;
      }

      this.calcTotalPrice();
    });

    //Event listener: when remove item is click
    EventBus.$on('delete-item', (index) => {
      //console.log('Eventlistener delete-item index:%s', index);
      this.list[index].is_deleted = true;

      this.calcTotalPrice();
    });

    //Event listener: when checkbox at table header is click
    EventBus.$on('check-all-item', (checked) => {
      //console.log('Eventlistener check-all-item checked:%s', checked);
      for(let index=0; index<this.list.length; index++){
        if(this.list[index].is_deleted == false){
          this.list[index].is_checked = checked;
        }
      }

      this.calcTotalPrice();
    });

    this.calcTotalPrice();
  }
}
</script>

