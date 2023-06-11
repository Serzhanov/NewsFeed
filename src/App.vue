<template>
  <div id='app'>
    <div class='my-navbar'>
      <nav class='navbar' role='navigation' aria-label='main navigation'>
        <h1 class='title is-3 my-title'>NewsFeed</h1>
        <div @click="() => type = '+'">
          <b-icon icon="plus"></b-icon>
        </div>
      </nav>
      <MyTabs :tabs='tabs' @tab-change='handleTabChange'></MyTabs>
    </div>
    <AddTopics @add-new-tags="addNewTags" @remove-tag="removeTag" :tags="tabs.filter(({type}) => type == 'custom').map(({ text }) => text)" v-if="type === '+'"></AddTopics>
    <div v-else class="articles">
      <NewsArticle v-for='(article, i) in currentTabNews'
        v-bind:key='i'
        v-bind:title='article.title'
        v-bind:content='article.description'
        v-bind:link='article.url'
        v-bind:date='article.publishedAt'
        v-bind:image='article.urlToImage'>
      </NewsArticle>
      <b-loading :is-full-page="false" :active.sync="fetching" :canCancel="true"></b-loading>
    </div>
  </div>
</template>

<script>
import MyTabs from '@/components/NavTabs'
import NewsArticle from '@/components/NewsArticle'
import AddTopics from '@/components/AddTopics'
import {mapState,mapActions} from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['generalNews','scienceNews','technologieNews','sportNews','businessNews']),
    // activeArticles: function () {
    //   return this.results[this.activeTab] ? this.results[this.activeTab].articles : []
    // }
    tabsNews(){
      return [this.generalNews,this.scienceNews,this.technologieNews,this.sportNews,this.businessNews]
    },
  },
  data () {
    return {
      // API_URL: 'https://newsapi.org/v2/top-headlines?country=ng&apiKey=ba09ef9453bd4b4bad5cd307ad133ef0&category=',
      // CUSTOM: 'https://newsapi.org/v2/everything?apiKey=ba09ef9453bd4b4bad5cd307ad133ef0&q=',
      results: [],
      fetching: false,
      activeTab: 0,
      currentTabNews:[],
      type: 'normal',
      tabs: [
        {type: 'normal', text: 'General', icon: 'bell'},
        {type: 'normal', text: 'Science', icon: 'flask'},
        {type: 'normal', text: 'Technology', icon: 'rocket'},
        {type: 'normal', text: 'Sports', icon: 'bookmark'},
        {type: 'normal', text: 'Business', icon: 'briefcase'}
      ],
      loadingComponent: null
    }
  },
  components: {
    MyTabs,
    NewsArticle,
    AddTopics
  },
  
  async mounted(){
    await this.fetchAllNews()
    this.currentTabNews=this.tabsNews[0]
    
    //this.currentTabNews=this.tabs[0]

  },
  methods: {
    ...mapActions(['fetchGeneralNews','fetchScienceNews','fetchTechnologieNews','fetchSportNews','fetchBusinessNews']),

    async fetchAllNews(){
     
      await Promise.all([
          this.fetchGeneralNews(),
          this.fetchScienceNews(),
          this.fetchTechnologieNews(),
          this.fetchSportNews(),
          this.fetchBusinessNews()
      ]).catch(error=>{
        console.error(error)
      })
    },
    handleTabChange (i) {
      this.currentTabNews=this.tabsNews[i]
    },
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.my-navbar {
  padding: 20px 30px 0px;
  box-shadow: 0px 0px 20px 2px rgba(100, 100, 100, 0.3);
}
.my-navbar > .navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.my-title {
  text-align: left;
}
</style>