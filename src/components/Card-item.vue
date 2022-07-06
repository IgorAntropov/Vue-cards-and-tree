<template>
  <div class="card"
       v-bind:class="{deleteAnimation: isDel}"
       v-if="checkVisible"
  >
    <button
        @click="hideImage"
    >X</button>
    <div class="flex-text-between image-info">
      <img
          :src="getImgUrl"
          alt=""
          @click="openBigImg"
      >
      <div class="image-describe flex-center">
        <span>Category: {{ item.category }}</span>
        <span>Timestamp: {{ timeStamp }}</span>
        <span>Size: {{ item.filesize }}</span>
      </div>
    </div>
  </div>

  <Popup
      v-if="isBigImg"
      @closePopup="closePopup"
      :imageSrc="item.image"
      :imageName="item.name"
  >
  </Popup>
</template>

<script>
import Popup from "@/components/Popup";

export default {
  name: "CardItemCmp",
  components: {
    Popup
  },
  props: {
    item: Object
  },
  data() {
    return {
      isDel: false,
      isBigImg: false
    }
  },
  computed: {
    timeStamp: function () {
      return new Date(this.item.timestamp).toLocaleDateString('ru-RU');
    },
    getImgUrl() {
      return require(`@/assets/images/${this.item.image.split('/')[1]}`);
    },
    checkVisible() {
      if (this.item.visible === undefined) {
        this.$store.dispatch('CHANGE_STATE_VISIBLE', {item: this.item, visible: true});
      }

      return this.item.visible;
    }
  },
  methods: {
    hideImage() {
      let self = this;
      this.isDel = true;

      setTimeout(function () {
        self.isDel = false;
        self.$store.dispatch('CHANGE_STATE_VISIBLE', {item: self.item, visible: false});
      }, 2000);
    },
    openBigImg() {
      this.isBigImg = true;
    },
    closePopup() {
      this.isBigImg = false;
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.image-info {
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.image-describe {
  flex-direction: column;
}

.card {
  width: 150px;
  height: 150px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  font-size: 12px;
  margin: 10px;
}

.card span {
  text-align: center;
  cursor: default;
}

.card img {
  width: 70px;
  height: 70px;
}

.card img,
.card button {
  cursor: pointer;
}

@keyframes hideAnimation {
  0%{
    opacity: 1;
    transform: rotateX(90deg);
  }
  50%{
    opacity: 0.5;
    transform: rotateX(0deg);
  }
  100%{
    display: none;
    opacity: 0;
    transform: rotateX(90deg);
  }
}

.deleteAnimation {
  animation-name: hideAnimation;
  animation-duration: 2000ms;
  animation-fill-mode: forwards;
}
</style>