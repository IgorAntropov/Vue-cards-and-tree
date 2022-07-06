<template>
  <Header></Header>
  <LoadIndicator
      v-if="!isUpload"
  >
  </LoadIndicator>
  <Body
      v-if="isUpload"
  >
  </Body>
  <Footer></Footer>
</template>

<script>
import Header from "@/components/common/Header";
import LoadIndicator from "@/components/supports/Load-indicator";
import Body from "@/components/common/Body";
import Footer from "@/components/common/Footer";

export default {
  name: "App",
  data() {
    return {
      isUpload: false
    }
  },
  components: {
    Header,
    LoadIndicator,
    Body,
    Footer
  },
  methods: {
    render(data) {
      this.$store.dispatch('UPLOAD_DATA', {data});
      this.isUpload = true;
    }
  },
  mounted() {
    var data;

    if (localStorage.state === undefined) {
      var self = this;
      var dataRequest;
      var requestURL = 'http://contest.elecard.ru/frontend_data/catalog.json';
      var request = new XMLHttpRequest();

      request.open('GET', requestURL);
      request.responseType = 'json';
      request.send();
      request.onload = function() {
        dataRequest = request.response;

        dataRequest.reduce((accumulator, currentValue) => {
          let group = currentValue.image.split('/')[0];
          let number = Math.round((Math.random()));
          currentValue.image = group + '/leergut_colli_0' + number + '.jpg';

          return accumulator;
        }, []);

        data = dataRequest;
        self.render(data);
      }
    } else {
      data = JSON.parse(localStorage.getItem('state'));
      this.render(data);
    }
  }
}
</script>

<style>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-text-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.flex-text-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bold {
  font-weight: bold;
}

.header,
.footer,
.body {
  border: 1px solid #656565;
  color: #656565;
  background-color: #c7c6c6;
  font-size: 24px;
  padding-left: 30px;
}

.header,
.footer {
  height: 50px;
}

html,
body,
#app{
  height: 100%;
  overflow-y: hidden;
  margin: 0;
}

.content,
.preloader {
  height: calc(100% - 100px);
}
</style>
