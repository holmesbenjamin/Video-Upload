import { createRouter, createWebHistory } from 'vue-router';
import UploadVideo from './components/UploadVideo.vue';
import VideoList from './components/VideoList.vue';
import VideoDisplay from './components/VideoDisplay.vue';

const routes = [
  {
    path: '/upload',
    name: 'upload',
    component: UploadVideo,
  },
  {
    path: '/',
    name: 'videos',
    component: VideoList,
  },
  {
    path: '/video/:id',
    name: 'video',
    component: VideoDisplay,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;