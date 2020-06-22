<template>
  <div id="app" class="container">
    <div class="row">
      <h1>Shopping cart</h1>
    </div>
    
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later.</p>
    </section>
    
    <section v-else>
      <div v-if="loading">Loading...</div>
      
      <shopping-cart 
      :list="list"
      :currency="currency"
      ></shopping-cart>

      <check-out 
      :currency="currency"
      :total_price="total_price"></check-out>
    </section>

    <footer-bar 
    :repo_name="repo_name"
    :repo_url="repo_url"
    :repo_author="repo_author"></footer-bar>
  </div>
</template>

<script>
import axios from 'axios';

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
      currency: 'RM',
      total_price: '0',
      repo_name: 'GitHub', 
      repo_url: 'https://github.com/tw-wong/vue-shopping-cart', 
      repo_author: 'tw-wong',
      
      list: [], 
      loading: true, 
      errored: false, 
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
    // console.log('Root %s created', this.$options.name);
  
    //Event listener: when item checkbox is click
    this.$eventBus.$on('check-item', (index, checked) => {
      //console.log('Eventlistener check-item index:%s, checked:%s', index, checked);
      this.list[index].is_checked = checked;

      this.calcTotalPrice();
    });

    //Event listener: when item quantity is update (minus / plus)
    this.$eventBus.$on('update-quantity', (index, type) => {
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
    this.$eventBus.$on('delete-item', (index) => {
      //console.log('Eventlistener delete-item index:%s', index);
      this.list[index].is_deleted = true;

      this.calcTotalPrice();
    });

    //Event listener: when checkbox at table header is click
    this.$eventBus.$on('check-all-item', (checked) => {
      //console.log('Eventlistener check-all-item checked:%s', checked);
      for(let index=0; index<this.list.length; index++){
        if(this.list[index].is_deleted == false){
          this.list[index].is_checked = checked;
        }
      }

      this.calcTotalPrice();
    });

    // this.calcTotalPrice();
  }, 
  mounted(){
    // console.log('Root %s mounted', this.$options.name);  
    let api = 'https://my-json-server.typicode.com/tw-wong/vue-shopping-cart/products';
    
    axios
      .get(api)
      .then(response => {
        this.list = response.data;
        this.calcTotalPrice();
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false)    
  }
}
</script>

