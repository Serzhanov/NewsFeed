import Vue from 'vue'
import Vuex from 'vuex'

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

    },
    actions:{
        fetchAllNews({dispatch}){
            return new Promise( (resolve,reject)=>{
                Promise.all([
                    dispatch('fetchGeneralNews'),
                    dispatch('fetchTechnologieNews'),
                    dispatch('fetchSportNews'),
                    dispatch('fetchBusinessNews')
                ]).then(resolve()).catch(reject())
            })
        },
        fetchGeneralNews(){
            return new Promise((resolve,reject)=>{

            })
        },
        fetchTechnologieNews(){
            return new Promise((resolve,reject)=>{
                
            })
        },
        fetchSportNews(){
            return new Promise((resolve,reject)=>{
                
            })
        },
        fetchBusinessNews(){
            return new Promise((resolve,reject)=>{
                
            })
        }
    },
})