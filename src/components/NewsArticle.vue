<template>
    <div class="card article">
      <div class="card-content">
        <article class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img :src="image || 'http://www.oneilllogistics.com/content/images/news.png'" alt="Image">
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
          <a href="#" class="card-footer-item">
            <b-icon pack="fa" icon="bookmark-o"></b-icon>&nbsp;
            Save
          </a>
          <a :href='link' target="_blank" class="card-footer-item">
            <b-icon pack="fa" icon="external-link"></b-icon>&nbsp;
            Open
          </a>
        </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NewsArticle',
    props: ['image', 'title', 'content', 'link', 'date']
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
  </style>