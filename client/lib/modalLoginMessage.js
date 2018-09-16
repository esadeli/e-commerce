Vue.component('modal-login-message',{
    template : 
    `
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

    `
})