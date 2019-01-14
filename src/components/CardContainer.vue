<template>
  <div class="mt-4">
    <CardComponent v-for="card in data" :card="card" :key="card.name"></CardComponent>
  </div>
</template>

<script>
import CardComponent from '@components/CardComponent';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['data'])
  },
  components: {
    CardComponent
  }
};
</script>
