import { shallowMount } from '@vue/test-utils'
import FooterBar from '@/components/FooterBar.vue'

describe('FooterBar', () => {
  const wrapper = shallowMount(FooterBar, {
    propsData: {
      repo_name: 'name', 
      repo_url: 'url', 
      repo_author: 'author', 
  }
  });
    
  test('repo name is refer from props.', () => {    
    expect(wrapper.props().repo_name).toBe('name');
  });
  
  test('repo url is refer from props.', () => {
    expect(wrapper.props().repo_url).toBe('url');
  });
  
  test('repo author is refer from props.', () => {
    expect(wrapper.props().repo_author).toBe('author');
  });
})