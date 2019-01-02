<template>
  <a class="wrap">
    <img class="img" v-bind:src="getAvatarUrl(person)"/>
    <PersonCountry :country="person.country" />
    <div class="description-layer">
      <PersonCountry :country="person.country" />
      <span class="description">
        <div class="description-position">{{ person.position }}</div>
        <hr/>
        <div class="description-contact">{{ person.email | lowercase }}</div>
      </span>
    </div>

    <div>{{ person.name }}</div>
  </a>
</template>

<script>
  import gravatar from 'gravatar';
  import PersonCountry from './PersonCountry.vue'

  export default {
    props: ['person'],
    methods: {
      getAvatarUrl(person) {
        return gravatar.url(person.email, {
          s: '285',
          d: `https://api.adorable.io/avatars/285/${person.id}.png`,
        })
      }
    },
    filters: {
      lowercase: function (value) {
        return value.toLowerCase();
      }
    },
    components: {
      PersonCountry,
    }
  }
</script>
