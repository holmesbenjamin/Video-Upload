<template>
  <div>
    <h1>Videos</h1>
    <ul>
      <li v-for="video in videos" :key="video.id">
        <router-link :to="`/video/${video.id}`">{{ video.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      videos: []
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/videos')
      .then(response => {
        this.videos = response.data;
      })
      .catch(err => console.error(err));
  }
}
</script>