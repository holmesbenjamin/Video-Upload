<!-- <template>
  <div>
    <div v-if="video">
      <h1>Video: {{ video.title }}</h1>
      <video controls :src="video.url"></video>
    </div>
    <div v-else>
      Loading video...
    </div>
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
</script> -->
<template>
  <div>
    <div v-if="video">
      <h1>Video: {{ video.title }}</h1>
      <a :href="video.url" :download="getDownloadFileName(video.url)">Download video</a>
    </div>
    <div v-else>
      Loading video...
    </div>
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
  },
  methods: {
    getDownloadFileName(url) {
      // Extract the file name from the URL
      const fileName = url.split('/').pop();
      return fileName;
    }
  }
}
</script>