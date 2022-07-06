<template>
  <div class="popup-wrapper flex-center" ref="popup_wrapper">
    <div class="popup">
      <div class="popup-header flex-text-between">
        <span></span>
        <button
            @click.stop="closePopup"
        >
          X
        </button>
      </div>

      <div class="popup-content">
        <img
            :src="getImgUrl"
            alt=""
        >
      </div>

      <div class="popup-footer">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupCmp",
  props: {
    imageSrc: {
      type: String
    }
  },
  methods: {
    onClickOutside: function (event) {
      if (event.target !== this.$refs['popup_wrapper']) {
        return;
      }

      this.closePopup();
    },
    closePopup: function () {
      this.$emit('closePopup');
    }
  },
  computed: {
    getImgUrl() {
      return require(`@/assets/images/${this.imageSrc}`);
    }
  },
  mounted() {
    document.addEventListener('click', this.onClickOutside);
  },
  unmounted() {
    document.removeEventListener('click', this.onClickOutside);
  }
}
</script>

<style scoped>
.popup-wrapper {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background: rgba(150, 140, 140, .4);
}

.popup {
  width: 300px;
  height: 300px;
  position: fixed;
  top: 60px;
  background-color: #ffffff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  border: 1px solid #656565;
}

.popup .popup-header,
.popup .popup-footer {
  height: 50px;
  width: 100%;
  background-color: #c7c6c6;
  color: #656565;
}

.popup > div > * {
  margin: 5px;
}

.popup .popup-content {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.popup .popup-content img {
  max-height: 200px;
  max-width: 300px;
}

.popup .popup-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>