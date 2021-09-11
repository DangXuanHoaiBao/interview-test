<template>
  <div>
    <div style="margin-bottom: 10px;">
      <label for="username">Username</label>
      <input
        id="username"
        class="input-custom"
        :class="{'is-invalid': submitted && validateUsername }"
        style="width: 100%;"
        placeholder="Enter username"
        type="text"
        v-model="username"
      />
      <div v-if="submitted && validateUsername" class="invalid-feedback">{{ validateUsername }}</div>
    </div>
    <div style="margin-bottom: 10px;">
      <label for="emailAddress">Email address</label>
      <input
        id="emailAddress"
        class="input-custom"
        :class="{'is-invalid': submitted && validateEmail }"
        style="width: 100%;"
        placeholder="Enter email address"
        type="email"
        v-model="email"
      />
      <div v-if="submitted && validateEmail" class="invalid-feedback">{{ validateEmail }}</div>
    </div>
    <br />
    <p>
      <button-custom 
        :loading="loading" 
        @click="handleSubmit"
      >
        Next
      </button-custom>
    </p>
    <p>
      <button-custom
        backgroundColor="#D03250"
        @click="handleCancel"
      >
        Cancel
      </button-custom>
    </p>
  </div>
</template>
<script>
import api from '../../api/index'
import ButtonCustom from '../ButtonCustom.vue'
export default {
  components: { ButtonCustom },

  props: {
    usernameProp: { type: String, default: '' },
    emailProp: { type: String, default: '' }
  },

  data () {
    return {
      username: '',
      email: '',
      loading: false,
      usernameError: '',
      submitted: false,
      existedEmail: false,
      existedUsername: false
    }
  },

  created () {
    this.username = this.usernameProp
    this.email = this.emailProp
  },

  computed: {
    validateUsername () {
      let errorMessage = ''
      if (!this.username) {
        errorMessage = 'Please input your username.'
      } else if (this.existedUsername === this.username) {
        errorMessage = 'Username already in use. Try another one.'
      }
      return errorMessage
    },
    validateEmail () {
      let errorMessage = ''
      const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
      if (!this.email) {
        errorMessage = 'Please input your email.'
      } else if (!this.email.match(mailformat)) {
        errorMessage = 'Please input valid email.'
      } else if (this.existedEmail === this.email) {
        errorMessage = 'Email address already in use. Please log in.'
      }
      return errorMessage
    }
  },

  methods: {
    handleSubmit () {
      this.submitted = true
      if (!this.validateUsername && !this.validateEmail) {
        this.handleCheckExists({ username: this.username, email: this.email })
      }
    },
    async handleCheckExists ({ username, email}) {
      try {
        this.loading = true
        const data = await api.user.checkExists({ username, email })
        this.existedEmail = data.email ? this.email : ''
        this.existedUsername = data.username ? this.username : ''
        console.log(data)
        if (!data.email && !data.username) {
          this.$emit('next', { username: this.username, email: this.email })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    handleCancel () {

    }
  }
}
</script>