<template>
  <div class="row">
  <footer class="font-weight-light">
    <div class="footer-copyright text-center py-3">{{ repo_name }}:
      <a :href="repo_url"> {{ repo_author }}</a>
    </div>
  </footer>
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  props: {
    repo_name: {
      type: String,
      required: true
    }, 
    repo_url: {
      type: String,
      required: true
    },
    repo_author: {
      type: String,
      required: true
    }
  }
}
</script>

