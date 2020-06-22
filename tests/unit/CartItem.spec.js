import { shallowMount } from '@vue/test-utils'
import CartItem from '@/components/CartItem.vue'

let wrapper;

beforeEach(() => {
  const mocks = {
    $eventBus: {
      $on: jest.fn(),
      $off: jest.fn(),
      $emit: jest.fn(),
    },
  };
    
  wrapper = shallowMount(CartItem, {
    propsData: {
      currency: 'USD',
      index: 0,
      id: 100,
      name: 'item name',
      image: 'item image url',
      price: 10.50,
      quantity: 99,
      is_checked: false,
      is_deleted: false,
    }, 
    mocks, 
  });  
});

afterEach(() => {
  wrapper.destroy();
});

describe('CartItem', () => {
  test('call chek_item fn, emit an event.', () => {
    const index = 0;    
    const checked = true;    
    wrapper.vm.check_item(index, checked);
        
    expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledWith('check-item', index, checked);        
  });
  
  test('call update_quantity fn, emit an event when item quantity is available.', () => {
    const quantity = 10;
    wrapper.setProps({quantity});
    
    const index = 0;    
    const checked = true;
    wrapper.vm.update_quantity(index, checked);
    
    expect(wrapper.vm.quantity).toBe(quantity);
    expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledWith('update-quantity', index, checked);
        
  });
  
  test('call update_quantity fn, no emit event when item quantity is not available.', () => {
    const quantity = 0;
    wrapper.setProps({quantity});
    
    const index = 0;    
    const checked = true;
    wrapper.vm.update_quantity(index, checked);
    
    expect(wrapper.vm.quantity).toBe(quantity);
    expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledTimes(0);
  });  
  
  test('call delete_item fn, emit an event.', () => {
    const index = 0;
    wrapper.vm.delete_item(index);
        
    expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledWith('delete-item', index);        
  });
    
  test('sub total calculation is correct.', () => {
    wrapper.setProps({
      currency: 'RM', 
      quantity: 2, 
      price: 29.99, 
    });
    expect(wrapper.vm.sub_total).toEqual('RM 59.98');
  });
  
  test('minus btn is disabled when quantity left 1', () => {
    let minus_disabled = false;
    let quantity = 1;
    
    wrapper.setProps({quantity});
    wrapper.setData({minus_disabled});
    wrapper.vm.update_minus_btn();
    
    expect(wrapper.vm.minus_disabled).toBe(true);    
  })
  
  test('minus btn is enabled when quantity is more than 1', () => {
    let minus_disabled = true;
    let quantity = 2;
    
    wrapper.setProps({quantity});
    wrapper.setData({minus_disabled});
    wrapper.vm.update_minus_btn();
    
    expect(wrapper.vm.minus_disabled).toBe(false);    
  })
})