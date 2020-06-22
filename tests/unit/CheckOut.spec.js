import { shallowMount } from '@vue/test-utils'
import CheckOut from '@/components/CheckOut.vue'

describe('CheckOut', () => {
  const wrapper = shallowMount(CheckOut, {
      propsData: {
      currency: 'USD', 
      total_price: '99.99', 
    }
  });
    
  test('currency is refer from props.', () => {    
    expect(wrapper.props().currency).toBe('USD');
  });
  
  test('total price is refer from props.', () => {
    expect(wrapper.props().total_price).toBe('99.99');
  });  
})