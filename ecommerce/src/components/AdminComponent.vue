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
                            @click.prevent="submit"
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
import { mapActions } from 'vuex';

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
        ...mapActions(['addItem', 'uploadImage']),
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            const fd = new FormData();
            fd.append('img', this.selectedFile, this.selectedFile.name);
            this.uploadImage(fd)
            .then((response) => {
                this.img = `/images/${response.data.filename}`;
            })
            .catch((err) => {
                this.selectedFile = null;
                this.$toasted.show('Please select image files only.', {
                    duration: 3000,
                    icon: 'exclamation-circle',
                });
                if (process.env.NODE_ENV === 'development') {
                    console.log(err);
                }
            });
        },
        submit() {
            const payload = {
                name: this.name,
                description: this.description,
                vendor: this.vendor,
                price: this.price,
                quantity: this.quantity,
                img: this.img,
            };
            this.addItem(payload)
            .then((response) => {
                this.$router.push('/');
                this.$toasted.show(response.data.msg, {
                    duration: 3000,
                    icon: 'exclamation-circle',
                });
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
