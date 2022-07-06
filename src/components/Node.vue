<template>
  <div class="node">
    <ul>
      <NodeItem v-for="(childItem, idx) in trueFormatData" :key="idx" :item="childItem" />
    </ul>
  </div>
</template>

<script>
import NodeItem from "@/components/Node-item";

export default {
  name: "NodeCmp",
  components: {
    NodeItem
  },
  data() {
    return {
      treeData: this.$store.state.data,
      trueFormatData: []
    }
  },
  mounted() {
    let category = this.treeData.reduce((accumulator, currentValue) => {
      if (!accumulator['root']) {
        accumulator['root'] = [];
      }

      if (!accumulator['names']) {
        accumulator['names'] = [];
      }

      if (accumulator['root'].indexOf(currentValue.category) === -1) {
        accumulator['names'].push(currentValue.category);
        accumulator['root'].push(currentValue.category);
      }

      return accumulator;
    }, []);

    this.treeData.reduce((accumulator, currentValue) => {
      let index = category['names'].indexOf(currentValue.category);

      if (index !== -1) {
        if (!category['root'][index]['childList']) {
          category['root'][index] = {
            name: category['root'][index],
            childList: []
          };
        }

        category['root'][index]['childList'].push(currentValue);
      }

      return accumulator;
    }, []);

    this.trueFormatData = category.root;
  }
}
</script>

<style scoped>
.node {
  max-height: 500px;
}
</style>