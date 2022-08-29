var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        brand: "Vue Mastery",
        product: 'Socks',
        description: 'A pair of warm, fuzzy socks',
        selectedVariant: 0,
        link: 'https://www.w3schools.com/css/css_margin.asp',
        inStock1: true,
        inStock2: false,
        inventory: 2,
        details: ["Loop through a list using v-for", "80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "vmSocks-green-onWhite.jpg",
                variantQuantity: 10,
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
            }
        ],
        cart1: 0,
        cart2: 0,
        cart3: [],
        onSale: true
        },
        methods:{
            addToCart: function(){
                this.cart2 += 1
            },
            remove: function(){
                this.cart2 -= 1
            },
            updateProduct2: function(index){
                this.selectedVariant = index
                console.log(index)
            },

            //Add, remove many different item to the same cart for components
            updateCart(id){
                this.cart3.push(id)
            },
            removeCart(id){
                for (var i=this.cart3.length - 1; i >= 0; i--){
                    if (this.cart3[i] === id){
                        this.cart3.splice(i, 1);
                    }
                }
            },
            
        },

        // Computed properties
        computed:{
            title(){
                return this.brand + ' ' + this.product;
            },
            image(){
                return this.variants[this.selectedVariant].variantImage
            },
            inStock3(){
                return this.variants[this.selectedVariant].variantQuantity
            },
            sale(){
                if (this.onSale){
                    return this.brand + ' ' + this.product + ' are ON SALE!'
                }
                return this.brand + ' ' + this.product + ' are NOT on sale.'
            }
        }
})
  
Vue.component('product', {
    props: {
        premium:{
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image">
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p> {{ description }}</p>
                
                <p>Shipping: {{ shipping }}</p>

                <p v-if="inStock3">In Stock 3(using computed properties)</p>
                <p v-else :class="{ outOfStock: !inStock2 }">Out of Stock 3(using computed properties)</p>
                <!--Add data property called onSale to this display is the product on sale-->
                <p>{{ sale }}</p>
                <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct2(index)">
                </div>

                <button v-on:click="addToCart">Add to Cart(function)</button>
                <button v-on:click="remove">Remove(function)</button>
            </div>

            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>
        </div>

    `,
    data () {
        return{
            brand: "Vue Mastery",
            product: 'Socks',
            description: 'A pair of warm, fuzzy socks',
            selectedVariant: 0,
            link: 'https://www.w3schools.com/css/css_margin.asp',
            inStock1: true,
            inStock2: false,
            inventory: 2,
            details: ["Loop through a list using v-for", "80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            cart1: 0,
            cart2: 0,
            reviews: [],
            onSale: true
        } 
    },
    methods:{
        //Add many different item to the same cart
        addToCart: function(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId )
        },
        remove: function(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct2: function(index){
            this.selectedVariant = index
            console.log(index)
        },
        //Add submitted review
        addReview(productReview){
            this.reviews.push(productReview)
        }
    },

    // Computed properties
    computed:{
        title(){
            return this.brand + ' ' + this.product;
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock3(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale(){
            if (this.onSale){
                return this.brand + ' ' + this.product + ' are ON SALE!'
            }
            return this.brand + ' ' + this.product + ' are NOT on sale.'
        },
        shipping(){
            if (this.premium){
                return "Free"
            }
            return 2.99
        }
    }
})

// Add 2-way binding
Vue.component('product-review',{
    template:`
        //.prevent: do not use default behavior, page do not refresh
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <p>
                <label for="name">Name: </label>
                <input id="name" v-model="name">
            </p>

            <p>
                <label for="review">Review: </label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating: </label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data(){
        return{
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods:{
        onSubmit(){
            if (this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
            }
        }
    }
})