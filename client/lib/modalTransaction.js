Vue.component('modal-transaction',{
    template : 
    `
    <div>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Your cart</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5>Hi {{ namelengkap }} berikut rincian belanjaan kamu: </h5>
                    <div v-for="buyitem in detailtemptransaction" >
                        <div>
                            {{ buyitem.item }} : Price {{ buyitem.price }} IDR
                        </div>
                    </div>
                    <hr/>
                    <h5>Total: {{ totaltemptransaction }}</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button v-on:click="createTransaction()" type="button" class="btn btn-primary"><font color="white">Buy Now</font></button>
                </div>
            </div>
        </div>
    </div>
    `,
    props : ['detailtemptransaction','totaltemptransaction','token','namelengkap'],
    data (){
        return {
            detailtemptransaction : [],
            totaltemptransaction : 0,
            error : ''
        }
    },
    methods : {
        createTransaction(){
            let self = this;

            axios({
                method : 'POST',
                url : 'http://localhost:3000/transactions/add',
                headers : {
                    token : self.token
                },
                data :{
                    itemId : self.detailtemptransaction
                }
            })
            .then( transaction =>{
                // if the transaction is successful and user still login
                // empty all previous transactions data
                    self.detailtemptransaction = [];
                    self.totaltemptransaction = 0;

                    // close transaction modal
                    $('#cartModal').modal('hide');

                    this.$emit('result-detail-temp-transaction',self.detailtemptransaction);
                    this.$emit('result-total-temp-transaction',self.totaltemptransaction);
            })
            .catch( error =>{
                self.error = error    
            })
        }
    }

})