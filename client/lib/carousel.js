Vue.component('carousel-e-belanja',{
    template : 
        `
        <div class="row">
            <div class="container">
                <div id="carouselExampleControls" class="carousel slide carouselMarginCustom" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active carouselCustom">
                            <img class="d-block w-100" src="./assets/image/japanese-landscape2.jpg" alt="First slide">
                        </div>
                        <div class="carousel-item carouselCustom">
                            <img class="d-block w-100 " src="./assets/image/Korean_Landscape.jpg" alt="Second slide">
                        </div>
                        <div class="carousel-item carouselCustom">
                            <img class="d-block w-100 " src="./assets/image/JapanLandscape.jpg" alt="Second slide">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>        
        `
})