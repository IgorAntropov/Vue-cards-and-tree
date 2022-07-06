<template>
  <div class="rollback flex-text-start">
    <button
        @click="showAllCards"
    >Rollback
    </button>
  </div>
  <div class="sorts flex-text-start">
    <label class="flex-text-between">
      <span class="bold">Date</span>
      <input type="radio" value="timestamp" v-model="selected" @change="sort" />
    </label>
    <label class="flex-text-between">
      <span class="bold">Size</span>
      <input type="radio" value="filesize" v-model="selected" @change="sort" />
    </label>
    <label class="flex-text-between">
      <span class="bold">Name</span>
      <input type="radio" value="image" v-model="selected" @change="sort" />
    </label>
    <label class="flex-text-between">
      <span class="bold">Category</span>
      <input type="radio" value="category" v-model="selected" @change="sort" />
    </label>
  </div>
  <div class="cards">
    <CardItem v-for="(childItem, idx) in cardData" :key="idx" :item="childItem" />
  </div>
</template>

<script>
import CardItem from "@/components/Card-item";

export default {
  name: "CardsCmp",
  components: {
    CardItem
  },
  data() {
    return {
      cardData: this.$store.state.data,
      selected: 'timestamp'
    }
  },
  methods: {
    sort() {
      let self = this;

      this.cardData.sort(function (a, b) {
        return a[self.selected] > b[self.selected] ? 1 : -1;
      });
    },
    showAllCards() {
      this.$store.dispatch('SHOW_ALL_CARDS', {visible: true});
    }
  },
  mounted() {
    this.sort();
  }
}
</script>

<style scoped>
.cards {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1000px;
  max-height: 500px;
}

.sorts {
  flex-direction: column;
}

.sorts > label {
  width: 100%;
  margin: 2px 10px;
}

.sorts > label,
.sorts > label > input {
  cursor: pointer;
}

.rollback {
  margin: 5px;
}
</style>