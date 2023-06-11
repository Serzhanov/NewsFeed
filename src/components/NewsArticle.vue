<template>
  <div>
    <!-- <PulseLoader class="spinner" :loading="loading" :color="color" :size="size"></PulseLoader> -->
    <SummaryModal  v-if="showModal" @switchingLoading="switchLoading" :url="link" :loading="loading" :title="this.title" @closingModal="closeModal" :image-src="image" :context="this.fullContextMap[title]"></SummaryModal>
    <div class="card article">
      <div class="card-content">
        <article class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img :src="image || 'http://www.oneilllogistics.com/content/images/news.png'" alt="Couldn't load the">
            </figure>
          </div>
          <div class="media-content">
              <p>
                <strong>{{ title }}</strong><small class="is-pulled-right">{{ (new Date(date)).toLocaleString() }}</small>
                <br>
              </p>
                {{ content }}
            </div>
          </article>
        </div>
       <footer class="card-footer">
          <a href='#' @click="getContext({title:title,url:link})" class="card-footer-item">
            <b-icon pack="fa" icon="bookmark-o"></b-icon>&nbsp;
            Get a summary
          </a>
          <a :href='link' target="_blank" class="card-footer-item">
            <b-icon pack="fa" icon="external-link"></b-icon>&nbsp;
            Open the source
          </a>
        </footer>
    </div>
  </div>
  </template>
  
  <script>
import { mapActions, mapState } from 'vuex';
import SummaryModal from './SummaryModal.vue';
  export default {
    components: {
      SummaryModal
    },
    data(){
      return {
        loading:false,
        showModal: false,
        color:'black',
        size:"23"
      }
    },
    computed:{
      ...mapState(['fullContextMap'])
    },
    name: 'NewsArticle',
    props: ['image', 'title', 'content', 'link', 'date'],
    methods:{
      ...mapActions(['getFullContext']),
      async getContext(obj){
        if(!this.fullContextMap[obj.title]){
          this.showModal = true;
          this.loading=true
          await this.getFullContext(obj).catch(()=>{
            this.fullContextMap[obj.title]="Problem occured"
          })
          this.loading=false
        }
      },
      switchLoading(e){
        this.loading=e
      },
      closeModal(){
        this.showModal=false
      }
    },
  }
  

  </script>
  
  <style>
  .card.article {
    max-width: 700px;
    margin: 20px auto;
    /* padding-bottom: 0px; */
  }
  .card-content {
    overflow: hidden;
  }

  .spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  </style>