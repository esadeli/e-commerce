Vue.component('list-categories',{
    template : 
        `
        <div class="col-md-3">
            <div class="navBarFixedLeft">
                <h3 class="my-4">Categories</h3>
                <div class="list-group">
                    <button v-on:click="getCategory('all')" class="list-group-item sideBarCustom">All Items</button>
                </div>
                <div v-for ="department in infoCategory">
                    <div class="list-group">
                        <button v-on:click="getCategory(department.name)" class="list-group-item sideBarCustom">{{ department.name }}</button>
                    </div>
                </div>
            </div>   
        </div>        
        `,
    data (){
        return {
            infoCategory :[],
            startPageItems : [],  
            categoryPageItems : [], 
            error : ''         
        }
    },
    methods : {
        getCleanList(rawArray,listCategory){

            let arrayClean = []
            for(let i = 0; i < rawArray.length;i++){
                let obj = rawArray[i];
                for(let j = 0; j< listCategory.length;j++){
                    if(obj.categoryInfo === listCategory[j]._id){
                        obj['CategoryName'] = listCategory[j].name
                    }
                }
                arrayClean.push(obj)
            }
            this.startPageItems = arrayClean;
            this.info = arrayClean;
            this.$emit('result-info',this.info);
        },
        getCategory : function (input){
            if(input==='all'){
                this.info = this.startPageItems;
            }else{

                this.categoryPageItems = [];
                for(let i = 0; i<this.startPageItems.length;i++){
                    if(this.startPageItems[i].CategoryName === input){
                        this.categoryPageItems.push(this.startPageItems[i])
                    }
                }
                this.info = this.categoryPageItems
                this.$emit('result-info',this.info)
            }
        }
    },
    created () {
        let self = this;
        axios({
            method : 'GET',
            url : `http://localhost:3000/items/lists`
        })
        .then(response => {
            console.log('masuk response', response.data.items)
            self.getCleanList(response.data.items,response.data.categories);
            
        })
        .catch(error =>{
            console.log(error.message, 'ini errorrrr')
            self.error = error
            this.$emit('result-list-item-error',self.error)
        })

        axios({
            method : 'GET',
            url : `http://localhost:3000/categories/lists`
        })
        .then( response =>{
            self.infoCategory = response.data.data
            this.$emit('result-info-category',self.infoCategory)
        })
        .catch(error => {
            self.error = error
        })
    }    
})