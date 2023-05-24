/* eslint-disable */
<template>
  <div>
    <h1>Video: {{ video.title }}</h1>
    <video controls :src="video.url"></video>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      video: null
    }
  },
  mounted() {
    const id = this.$route.params.id;
    
    axios
      .get(`http://localhost:3000/videos/${id}`)
      .then(response => {
        this.video = response.data;
      })
      .catch(err => console.error(err));
  }
}
</script>