import { shallowMount } from '@vue/test-utils'
import ShoppingCart from '@/components/ShoppingCart.vue'

let wrapper;

beforeEach(() => {
  const mocks = {
    $eventBus: {
      $on: jest.fn(),
      $off: jest.fn(),
      $emit: jest.fn(),
    },
  };
    
  wrapper = shallowMount(ShoppingCart, {
    propsData: {
      list: [], 
      currency: 'url', 
    }, 
    mocks, 
  });
    
});

afterEach(() => {
  wrapper.destroy();
});

describe('ShoppingCart', () => {  
  test('default is_check_all is false.', () => {    
    const checked = false;
    expect(wrapper.vm.is_checked_all).toBe(checked);
  });

  test('set is_check_all to true, emit an event.', () => {
    const checked = true;
    wrapper.vm.check_all_item(checked);
    
    expect(wrapper.vm.is_checked_all).toBe(checked);
    expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledWith('check-all-item', checked);
  });
  
  test('set is_check_all to false, emit an event.', () => {
    const checked = false;    
    wrapper.vm.check_all_item(checked);
    
    expect(wrapper.vm.is_checked_all).toBe(checked);
    expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledWith('check-all-item', checked);    
  });
})