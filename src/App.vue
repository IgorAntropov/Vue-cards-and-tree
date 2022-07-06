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
import Header from "@/components/Header";
import LoadIndicator from "@/components/Load-indicator";
import Body from "@/components/Body";
import Footer from "@/components/Footer";

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
  mounted() {
    var self = this;
    var dataRequest;
    var data;
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

      data = localStorage.state !== undefined
          ? JSON.parse(localStorage.getItem('state'))
          : dataRequest;

      self.$store.dispatch('UPLOAD_DATA', {data});

      self.isUpload = true;
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
