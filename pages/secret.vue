<template>
<div class="mt-2">
  <b-jumbotron header="Secret Page" lead="Cookie base auth">
    <hr class="my-4">
    <b-button variant="primary" to="/">Home</b-button>
  </b-jumbotron>
</div> 
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>
