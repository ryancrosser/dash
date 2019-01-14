<template>
  <div>
    <Navbar></Navbar>
    <div class="container-fluid">
      <CardContainer></CardContainer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@components/Navbar';
import CardContainer from '@components/CardContainer';

export default {
  name: 'home',
  components: {
    Navbar,
    CardContainer
  }
};
</script>
