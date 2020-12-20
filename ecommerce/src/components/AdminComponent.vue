<template>
    <div class="admin">
        <div class="container flex">
            <div class="card">
                <form>
                    <div class="form-control">
                        <input
                            v-model="name"
                            type="text"
                            placeholder="Article name"
                        />
                    </div>
                    <div class="form-control">
                        <input
                            v-model="price"
                            type="text"
                            placeholder="Article price"
                        />
                    </div>
                    <div class="form-control">
                        <input
                            v-model="quantity"
                            type="text"
                            placeholder="Article quantity"
                        />
                    </div>
                    <div class="form-control">
                        <input
                            v-model="vendor"
                            type="text"
                            placeholder="Article vendor"
                        />
                    </div>
                    <div class="form-control">
                        <input
                            @change="onFileSelected"
                            type="file"
                            name="img"
                        />
                    </div>
                    <div class="form-control">
                        <textarea
                            v-model="description"
                            placeholder="Enter product description"
                        />
                    </div>
                    <div class="form-control">
                        <input
                            @click.prevent="addItem"
                            class="btn"
                            type="submit"
                            value="ADD ARTICLE"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminComponent',
    data() {
        return {
            selectedFile: null,
            name: '',
            description: '',
            vendor: '',
            price: '',
            quantity: '',
            img: '',
        };
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            const fd = new FormData();
            fd.append('img', this.selectedFile, this.selectedFile.name);
            axios.post('/api/uploads/', fd)
            .then((response) => {
                this.img = `//localhost:3000/${response.data.filename}`;
            })
            .catch((err) => {
                this.$toasted.show(err.response.data.error, {
                    duration: 3000,
                    icon: 'exclamation-circle',
                });
            });
        },
        addItem() {
            const payload = {
                name: this.name,
                description: this.description,
                vendor: this.vendor,
                price: this.price,
                quantity: this.quantity,
                img: this.img,
            };
            axios.post('/api/products', payload)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                this.$toasted.show(err.response.data.error, {
                    duration: 3000,
                    icon: 'exclamation-circle',
                });
            });
        },
    },
};
</script>

<style>
</style>
