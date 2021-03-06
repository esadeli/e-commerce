Vue.component('list-items',{
    template : 
    `
    <div>    
        <!--set a space between carousel and list item -->                                                  
        <div class="marginBottom"></div>
        <div v-if="info.length >0 ">
            <div v-if="errorlist.length > 0">
                {{ errorlist }}
            </div>
            <div v-for="data in info">
                <div class="row">
                    <div class ="col-md-3">
                        <div class="itemBox">
                            <div class="card" style="width: 18rem;">
                                <img class="card-img-top img-fluid" src="./assets/image/asian_casual_fashion03.jpg" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">{{ data.name }}</h5>
                                    <p class="card-text">Price : {{ data.price }}</p>
                                    
                                    <div v-if=" namelengkap === '' ">
                                        <a data-toggle="modal" data-target="#loginMessage" class="btn btn-primary"><font color="white">Order Now</font></a>    
                                    </div>
                                    <div v-else> 
                                        <a v-on:click="getIndividualOrder(data.name,data.price)" class="btn btn-primary"><font color="white">Order Now</font></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- set a white space between item display-->
                    <div class="col-md-1">
                    </div>
                    <div class ="col-md-3">
                        <div class="itemBox">
                            <div class="card" style="width: 18rem;">
                                <img class="card-img-top img-fluid" src="./assets/image/japan-casual-02.jpg" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">{{ data.name }}</h5>
                                    <p class="card-text">Price : {{ data.price }}</p>
                                    
                                    <div v-if=" namelengkap === '' ">
                                        <a data-toggle="modal" data-target="#loginMessage" class="btn btn-primary"><font color="white">Order Now</font></a>    
                                    </div>
                                    <div v-else> 
                                        <a v-on:click="getIndividualOrder(data.name,data.price)" class="btn btn-primary"><font color="white">Order Now</font></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- set a white space between item display-->
                    <div class="col-md-1">
                    </div>
                    <div class ="col-md-3">
                        <div class="itemBox">
                            <div class="card" style="width: 18rem;">
                                <img height ="430" class="card-img-top" src="./assets/image/japan-casual01.jpg" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">{{ data.name }}</h5>
                                    <p class="card-text">Price : {{ data.price }}</p>

                                    <div v-if=" namelengkap === '' ">
                                        <a data-toggle="modal" data-target="#loginMessage" class="btn btn-primary"><font color="white">Order Now</font></a>    
                                    </div>
                                    <div v-else> 
                                        <a v-on:click="getIndividualOrder(data.name,data.price)" class="btn btn-primary"><font color="white">Order Now</font></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div>
                        <div class="col-md-12">
                            <img height="40px" width="100%" src="./assets/image/whiteBox.jpg">
                        </div>
                    </div>
                </div>        
            </div>  
        </div>   
        <div v-else>
            Items Sold Out
            <div class="row">
                <div>
                    <div class="col-md-12">
                        <img height="50px" width="100%" src="./assets/image/whiteBox.jpg">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div>
                <div class="col-md-12">
                    <img height="30px" width="100%" src="./assets/image/whiteBox.jpg">
                </div>
            </div>
        </div>
        <div class="modal fade" id="loginMessage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <label>You have to login/register first to buy</label>
                    </div>
                    <br/>
                    <br/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <!--
                    <button type="button" v-on:click="loginToSite()" class="btn btn-primary">Login</button>
                    -->    
                </div>
            </div>
        </div>
    </div>

    </div>
    `   ,
    props : ['info','errorlist', 'token','namelengkap'],
    data(){
        return {
            detailTempTransaction :[],
            totalTempTransaction : 0,
        }
    },
    methods :{
        getIndividualOrder(item,price){

            if(this.token !== ''){
                let obj = {}
                obj['item'] = item;
                obj['price'] = Number(price);

                // add app to total sum
                this.totalTempTransaction = this.totalTempTransaction + Number(price);
                this.detailTempTransaction.push(obj)

                this.$emit('result-total-temp-transaction',this.totalTempTransaction);
                this.$emit('result-detail-temp-transaction',this.detailTempTransaction);
            }else{
                // set detail transaction to be always empty when there's no token
                this.detailTempTransaction = [];
            }
        }
    }
})