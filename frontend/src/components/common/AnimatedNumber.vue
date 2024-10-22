<template>
  <div>{{ formattedNumber }}</div>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      displayNumber: 0,
      interval: null
    };
  },
  computed: {
    formattedNumber() {
      return this.displayNumber.toLocaleString();
    }
  },
  mounted() {
    // Trigger the counting logic on initial mount
    this.startCounting();
  },
  watch: {
    number() {
      // Restart counting logic if `number` prop changes
      this.startCounting();
    }
  },
  methods: {
    startCounting() {
      clearInterval(this.interval);

      if (this.number === this.displayNumber) {
        return;
      }

      this.interval = setInterval(() => {
        if (this.displayNumber !== this.number) {
          let change = (this.number - this.displayNumber) / 10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.displayNumber += change;
        }

        // Stop the interval when the number matches
        if (this.displayNumber === this.number) {
          clearInterval(this.interval);
        }
      }, 20);
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
