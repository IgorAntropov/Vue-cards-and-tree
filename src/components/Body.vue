<template>
  <div class="content flex-center">
    <div class="switch-show-type flex-text-start">
      <label>
        <span class="bold">Tree</span>
        <input type="radio" value="node" v-model="selected" @change="toggleShowType" />
      </label>
      <label>
        <span class="bold">Cards</span>
        <input type="radio" value="cards" v-model="selected" @change="toggleShowType" />
      </label>
    </div>

    <Node
        v-if="showTree"
    >
    </Node>

    <Cards
        v-if="showCards"
    >
    </Cards>

  </div>
</template>

<script>
import Node from "@/components/Node";
import Cards from "@/components/Cards";

export default {
  name: "BodyCmp",
  components: {
    Node,
    Cards
  },
  data() {
    return {
      selected: 'cards',
      showCards: true,
      showTree: false
    }
  },
  methods: {
    toggleShowType() {
      this.showCards = this.selected === 'cards';
      this.showTree = this.selected === 'node';
    }
  }
}
</script>

<style scoped>
.content {
  flex-direction: column;
  overflow-y: scroll;
}

.switch-show-type > label {
  margin: 20px;
}

.switch-show-type > label,
.switch-show-type > label > input {
  cursor: pointer;
}
</style>