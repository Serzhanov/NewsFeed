import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import VuexPersistence from "vuex-persist";
// /require('dotenv').config();

const apiKey = "3f442164b1354ba5ae409fc1a38ad98e"
const apiNewsAddresse = "https://newsapi.org/v2/"
// const vuexLocal = new VuexPersistence({
//     //storage: window.localStorage,
//     storage: window.sessionStorage,
//   })
Vue.use(Vuex)

export default new Vuex.Store({

    state:{
        generalNews:[],
        scienceNews:[],
        technologieNews:[],
        sportNews:[],
        businessNews:[]

    },
    getters:{

    },
    mutations:{
        setGeneralNews(state,news){
            state.generalNews=news
        },
        setTechnologieNews(state,news){
            state.technologieNews=news
        },
        setBusinessNews(state,news){
            state.businessNews=news
        },
        setScienceNews(state,news){
            state.scienceNews=news
        },
        setSportNews(state,news){
            state.sportNews=news
        },
    },
    actions:{
        // eslint-disable-next-line no-unused-vars
        fetchAllNews({ commit, dispatch }){
            return new Promise( (resolve,reject)=>{
                Promise.all([
                    dispatch('fetchGeneralNews'),
                    dispatch('fetchScienceNews'),
                    dispatch('fetchTechnologieNews'),
                    dispatch('fetchSportNews'),
                    dispatch('fetchBusinessNews')
                ]).then(resolve()).catch(reject())
            })
        },
        fetchGeneralNews({commit}){
            return new Promise((resolve,reject)=>{
                axios.get(apiNewsAddresse+"top-headlines?q=general&apiKey="+apiKey).then(response=>{
                    const data=response.data.articles
                    console.log(data)
                    commit('setGeneralNews',data)
                    resolve(response)
                }).catch(error=>reject(error))
            })
        },
        fetchScienceNews({commit}){
            return new Promise((resolve,reject)=>{
                axios.get(apiNewsAddresse+"top-headlines?q=science&apiKey="+apiKey).then(response=>{
                    const data=response.data.articles
                    commit('setScienceNews',data)
                    resolve(response)
                }).catch(error=>reject(error))
            })
        },
        fetchTechnologieNews({commit}){
            return new Promise((resolve,reject)=>{
                axios.get(apiNewsAddresse+"top-headlines?q=technologie&apiKey="+apiKey).then(response=>{
                    const data=response.data.articles
                    commit('setTechnologieNews',data)
                    resolve(response)
                }).catch(error=>reject(error))
            })
        },
        fetchSportNews({commit}){
            return new Promise((resolve,reject)=>{
                axios.get(apiNewsAddresse+"top-headlines?q=sport&apiKey="+apiKey).then(response=>{
                    const data=response.data.articles
                    commit('setSportNews',data)
                    resolve(response)
                }).catch(error=>reject(error))
            })
        },
        fetchBusinessNews({commit}){
            return new Promise((resolve,reject)=>{
                axios.get(apiNewsAddresse+"top-headlines?q=business&apiKey="+apiKey).then(response=>{
                    const data=response.data.articles
                    commit('setBusinessNews',data)
                    resolve(response)
                }).catch(error=>reject(error))
            })
        }
    },
})