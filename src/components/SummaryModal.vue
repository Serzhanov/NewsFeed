<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="radio-container-wrapper">
            <div class="radio-container" v-for="size in textSize" :key="size.id">
            <input type="radio" :id="size.id" :value="size.name" v-model="selectedSize">
            <label :for="size.id">{{ size.name }}</label>
            </div>
        </div>
        <h2>{{ title }}</h2>
        <img class="modal-image" :src="imageSrc" alt="Modal Image" />
        <PulseLoader class="spinner" :loading="loading" :color="color" :size="size"></PulseLoader>
        <p v-if="!loading" class="modal-text">{{ context[selectedSize] }}</p>
        <button class="modal-close-button" aria-label="Close modal" @click="closeModal">&times;</button>
      </div>
    </div>
  </template>
  
  <script>
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  import { mapActions, mapState } from 'vuex';
  export default {
    props: {
      title: String,
      imageSrc: String,
      context: Object,
      url:String,
      loading:Boolean
    },
    components:{
        PulseLoader
    },
    computed:{
        ...mapState(['fullContextMap'])
    },
    watch:{
        async selectedSize(val){
            if(!this.fullContextMap[this.title][val]){
                this.switchLoading(true)
                await this.fetchOtherSizeContext(val)
                this.switchLoading(false)
            }
        }
    },
    data(){
        return{
            color:"black",
            size:"56",
            textSize:[
                {id:1,name:'Large'},
                {id:2,name:'Medium'},
                {id:3,name:'Small'}
            ],
            selectedSize: "Large"
        }

    },
    methods:{
        ...mapActions(['getMediumContext','getSmallContext']),
        closeModal(){
            this.$emit('closingModal');
        },
        switchLoading(val){
            this.$emit('switchingLoading',val)
        },
        async fetchOtherSizeContext(size){
            if(size==='Medium'){
                await this.getMediumContext({title:this.title,url:this.url})
            }
            if(size==='Small'){
                await this.getSmallContext({title:this.title,url:this.url})
            }
        }
       
    }
  };
  </script>
  
<style scoped>

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure the modal appears on top of other elements */
}

/* Modal Content */
.modal-content {
  background-color: #fff;
  padding: 20px;
  max-width: 800px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Modal Close Button */

/* Modal Image */
.modal-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
.modal-close-button {
  /* Styles for the close button */
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: #999;
  font-size: 20px;
  cursor: pointer;
  outline: none;
}

.modal-close-button:hover {
  color: #333;
}

/* Modal Text */
.modal-text {
  font-size: 16px;
  line-height: 1.5;
}
.radio-container-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 10px;
}

.radio-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.radio-container input[type="radio"] {
  display: none;
}

.radio-container label {
  display: inline-block;
  margin-left: 5px;
  cursor: pointer;
}

.radio-container input[type="radio"] + label:before {
  content: "";
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #ccc;
  vertical-align: middle;
  margin-right: 5px;
}

.radio-container input[type="radio"]:checked + label:before {
  background-color: #2196f3;
}
</style>