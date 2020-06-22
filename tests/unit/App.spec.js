import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

let wrapper;

beforeEach(() => {
  const mocks = {
    $eventBus: {
      $on: jest.fn(),
      $off: jest.fn(),
      $emit: jest.fn(),
    },
  };

  wrapper = shallowMount(App, {    
    mocks, 
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe('App', () => {    
  test('total price calculation is correct.', () => {    
    const list = [
      {
        id: 1, 
        name: 'Item 01', 
        image: 'url', 
        price: 5.00, 
        quantity: 1, 
        is_checked: true,
        is_deleted: false
      }, 
      {
        id: 2, 
        name: 'Item 02', 
        image: 'url', 
        price: 7.90, 
        quantity: 2, 
        is_checked: true,
        is_deleted: false
      },   
      {
        id: 3, 
        name: 'Item 03', 
        image: 'url', 
        price: 3.00, 
        quantity: 3, 
        is_checked: false,
        is_deleted: false, 
      }, 
      {
        id: 4, 
        name: 'Item 04', 
        image: 'url', 
        price: 2.00, 
        quantity: 4, 
        is_checked: false,
        is_deleted: true, 
      },            
    ]
    wrapper.setData({list});
    wrapper.vm.calcTotalPrice();
    
    expect(wrapper.vm.total_price).toEqual('20.80');
  });
  
})