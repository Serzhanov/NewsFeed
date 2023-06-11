import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const apiKey = "3f442164b1354ba5ae409fc1a38ad98e"
const apiNewsAddresse = "https://newsapi.org/v2/"
const apiProxyServeSummarization="https://proxyserverapp.herokuapp.com/proxy/summary"
const LARGE=512
const MEDIUM=1024
const SMALL=2048
Vue.use(Vuex)

export default new Vuex.Store({

    state:{
        generalNews:[],
        scienceNews:[],
        technologieNews:[],
        sportNews:[],
        businessNews:[],
        fullContextMap:{}//title:context

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
        setFullContext(state,{title,context}){
            state.fullContextMap[title]={
                Large:context,
            }
        },
        setSmallContext(state,{title,context}){
            state.fullContextMap[title]["Small"]=context
        },
        setMediumContext(state,{title,context}){
            state.fullContextMap[title]["Medium"]=context
        }
    },
    actions:{
        // eslint-disable-next-line no-unused-vars
        
        fetchGeneralNews({commit}){
            return new Promise((resolve,reject)=>{
                axios.get(apiNewsAddresse+"top-headlines?q=general&language=en&apiKey="+apiKey).then(response=>{
                    const data=response.data.articles
                    commit('setGeneralNews',data)
                    resolve(response)
                }).catch(error=>reject(error))
            })
        },
        fetchScienceNews({commit}){
            return new Promise((resolve,reject)=>{
                axios.get(apiNewsAddresse+"top-headlines?q=science&language=en&apiKey="+apiKey).then(response=>{
                    const data=response.data.articles
                    commit('setScienceNews',data)
                    resolve(response)
                }).catch(error=>reject(error))
            })
        },
        fetchTechnologieNews({commit}){
            return new Promise((resolve,reject)=>{
                axios.get(apiNewsAddresse+"top-headlines?q=technologie&language=en&apiKey="+apiKey).then(response=>{
                    const data=response.data.articles
                    commit('setTechnologieNews',data)
                    resolve(response)
                }).catch(error=>reject(error))
            })
        },
        fetchSportNews({commit}){
            return new Promise((resolve,reject)=>{
                axios.get(apiNewsAddresse+"top-headlines?q=sport&language=en&apiKey="+apiKey).then(response=>{
                    const data=response.data.articles
                    commit('setSportNews',data)
                    resolve(response)
                }).catch(error=>reject(error))
            })
        },
        fetchBusinessNews({commit}){
            return new Promise((resolve,reject)=>{
                axios.get(apiNewsAddresse+"top-headlines?q=business&language=en&apiKey="+apiKey).then(response=>{
                    const data=response.data.articles
                    commit('setBusinessNews',data)
                    resolve(response)
                }).catch(error=>reject(error))
            })
        },
        getFullContext({ commit }, article) {
            return new Promise((resolve, reject) => {
                axios.post(apiProxyServeSummarization,{url:article.url,size:LARGE}).then(resp=>{
                const contextSummary=resp.data.contextSummary
                commit("setFullContext",{title:article.title,context:contextSummary})
                resolve(resp)
            }).catch(error=>{
                reject(error)
            });
        })
        },
        getMediumContext({ commit }, article) {
            return new Promise((resolve, reject) => {
                axios.post(apiProxyServeSummarization,{url:article.url,size:MEDIUM}).then(resp=>{
                const contextSummary=resp.data.contextSummary
                commit("setMediumContext",{title:article.title,context:contextSummary})
                resolve(resp)
            }).catch(error=>{
                reject(error)
            });
        })
        },
        getSmallContext({ commit }, article) {
            return new Promise((resolve, reject) => {
                axios.post(apiProxyServeSummarization,{url:article.url,size:SMALL}).then(resp=>{
                const contextSummary=resp.data.contextSummary
                commit("setSmallContext",{title:article.title,context:contextSummary})
                resolve(resp)
            }).catch(error=>{
                reject(error)
            });
        })
        },
    },
   

})