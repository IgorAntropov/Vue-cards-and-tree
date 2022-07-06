<template>
  <li @click.stop="toggleChildren">
    <div
        class="flex-center"
        v-bind:class="{treeLine: isFolder}"
    >
      <span>{{ item.name }}</span>
      <span v-if="isFolder">{{ itemSuffix }}</span>
      <img
          v-if="item.image"
          :src="getImgUrl"
          alt=""
          @click="openBigImg"
      >
    </div>

    <ul v-if="item.childList?.length && isOpen">
      <node-item-cmp v-for="(childItem, idx) in item.childList" :key="idx" :item="childItem" />
    </ul>
  </li>

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
  name: "NodeItemCmp",
  props: {
    item: Object
  },
  components: {
    Popup
  },
  data() {
    return {
      isOpen: false,
      isBigImg: false
    }
  },
  computed: {
    isFolder: function () {
      return !!this.item?.childList?.length;
    },
    itemSuffix: function () {
      return `  [${this.isOpen ? '-' : '+'}]`;
    },
    getImgUrl() {
      return require(`@/assets/images/${this.item.image}`);
    },
  },
  methods: {
    toggleChildren() {
      this.isOpen = !this.isOpen;
    },
    openBigImg() {
      this.isBigImg = true;
    },
    closePopup() {
      this.isBigImg = false;
    }
  }
}
</script>

<style scoped>
li > div {
  cursor: default;
}

.treeLine {
  cursor: pointer;
}

li {
  margin: 5px;
}

img {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 2px;
}
</style>