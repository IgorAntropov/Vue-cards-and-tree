<template>
  <div class="preloader flex-center">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: "LoadIndicatorCmp"
}
</script>

<style scoped>
.spinner {
  height: 50px;
  width: 50px;
  border-left: 3px solid #000000;
  border-bottom: 3px solid #313131;
  border-right: 3px solid #676767;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spinnerAnimation 1s linear infinite;
}

@keyframes spinnerAnimation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>