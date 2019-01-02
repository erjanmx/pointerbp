<template>
  <div id="app">
    <div class="search-wrapper">
      <input ref="search" type="text" v-model="searchText" placeholder="Search..."/>
      <div v-show="!loading" class="info">
        {{ filteredList.length }} / {{ peopleList.length }}
      </div>
      <label>Search:</label>
    </div>
    <PeopleList :people="filteredList" :loading="loading"/>
  </div>
</template>

<script>
import axios from 'axios';
import Person from '../person';
import fakeData from '../data/data.json'

import PeopleList from './PeopleList.vue'

export default {
  name: 'app',
  data () {
    return {
      searchText: '',
      peopleList : [],
      loading: true,
    }
  },
  mounted: function () {
    // set filter on load if provided
    let name = this.$route.query.name;
    if (name) {
      this.searchText = name;
    }
    this.$refs.search.focus();
  },
  created: function () {
    this.fetchPeople();
  },
  computed: {
    filteredList() {
      return this.peopleList.filter(person => {
        let searchText = this.searchText.toLowerCase();

        return person.name.toLowerCase().includes(searchText) ||
          person.email.toLowerCase().includes(searchText) ||
          person.position.toLowerCase().includes(searchText) ||
          person.country.name.toLowerCase().includes(searchText);
      })
    }
  },
  watch: {
    searchText: function (val) {
      let p = val.length ? `?name=${val}` : '';
      this.$router.replace(p);
    },
  },
  methods: {
    loadData(data) {
      this.peopleList = data.map(row =>
        new Person(
          row.id,
          row.name,
          row.email,
          row.position || '',
          row.country || { code: '', name: '' },
        )
      );
      this.loading = false;
    },
    fetchPeople() {
      axios.get('/users/employees')
        .then((response)  =>  {
          this.loadData(response.data.payload)
        }, (error)  =>  {
          this.loadData(fakeData)
        })
    },
  },
  components: {
    PeopleList,
  }
}
</script>

<style lang="scss">
  @import '../assets/app';
</style>
