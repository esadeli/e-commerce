Vue.component('modal-login-form',{
    template :
        `
        <div class="modal fade" id="loginUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="error.length !== 0">
                        <div class="alert alert-danger alert-dismissible fade show">
                            <strong>Error!</strong> {{ error }}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <br/>
                            <br/>
                        </div>
                    </div>
                    <div>
                        <label>Email</label>
                        <input v-model="email"  type="text" placeholder="email">
                    </div>
                    <br/>
                    <div>
                        <label>Password</label>
                        <input v-model="password" type="password" placeholder="password">
                    </div>
                    <br/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" v-on:click="loginToSite()" class="btn btn-primary">Login</button>
                </div>
            </div>
        </div>
    </div>
        `
    ,
    data(){
        return {
            email : '',
            password : '',
            token : '',
            error : '',
            userId : '',
            nameLengkap : ''
        }
    },
    methods :{
        loginToSite(){
            // console.log(this.email, this.password)
            let self = this
            axios({
                method : 'POST',
                url : 'http://localhost:3000/users/login',
                data : {
                    email : self.email,
                    password : self.password
                }
            })
            .then( response =>{
                let jwttoken = response.data.token;
                
                // get user credentials
                axios({
                    method : 'GET',
                    url : 'http://localhost:3000/users/details',
                    headers : {
                        token : jwttoken
                    }
                })
                .then(user=>{
                    self.userId = user.data.data.id
                    self.nameLengkap = user.data.data.name
                    // empty the password
                    self.password = ''
                    
                    localStorage.setItem('token',jwttoken);
                    self.token = localStorage.getItem('token');

                    //emit back to parent
                    this.$emit('result-user-id',self.userId);
                    this.$emit('result-name-lengkap',self.nameLengkap);
                    this.$emit('result-token',self.token);

                    // hide the login page
                    $('#loginUser').modal('hide');
                })
                .catch(error=>{
                    self.error = error  
                })

            })
            .catch(error =>{
                self.error = JSON.stringify(error.response.data.msg)
            })
        }
    }    
})