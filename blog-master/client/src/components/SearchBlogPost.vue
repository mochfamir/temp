<template>
  <div>
    <div class="card my-4">
      <h5 class="card-header">Search</h5>
      <div class="card-body">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search for..." v-model="search">
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="button" @click="searchMethods">Go</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>



export default {
    name: 'w-search',
    data() {
        return {
            search: ''
        }
    },
    methods: {
        searchMethods() {
            this.$emit('widget-search', this.search)
        },
    },
}
</script>


