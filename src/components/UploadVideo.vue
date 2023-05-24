<template>
  <div>
    <h1>Upload a video</h1>
    <input type="file" @change="uploadVideo" />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    uploadVideo(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('video', file);
      axios
        .post('http://localhost:3000/videos', formData)
        .then(() => alert('Video uploaded successfully'))
        .catch(err => console.error(err));
    }
  }
}
</script>