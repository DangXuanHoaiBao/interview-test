<template>
  <div>
    <div style="margin-bottom: 10px;">
      <label for="password">Password</label>
      <div class="input-container">
        <input
          ref="passwordRef"
          id="password"
          class="input-custom"
          :class="{'is-invalid': submitted && !validateReqAll}"
          placeholder="Enter password"
          type="password"
          autocomplete="new-password"
          v-model="password"
        />
        <img 
          @click="togglePassVisibility('passwordRef')" 
          class="input-icon" 
          src="../../assets/images/eyes.svg" 
        />
      </div>
    </div>
    <div style="margin-bottom: 10px;">
      <label for="confirmPassword">Confirm password</label>
      <div class="input-container">
        <input
          ref="confirmPasswordRef"
          id="confirmPassword"
          class="input-custom"
          :class="{'is-invalid': submitted && !validateConfirmPassword}"
          placeholder="Enter confirm password"
          type="password"
          autocomplete="new-password"
          v-model="confirmPassword"
        />
        <img 
          @click="togglePassVisibility('confirmPasswordRef')" 
          class="input-icon" 
          src="../../assets/images/eyes.svg" 
        />
      </div>
    </div>
    <br />
    <div class="requirement-list">
      <div class="requirement-title" :style="{ color: submitted && (validateReqAll ? color.black : color.redDark) }">
        <span>Requirements</span>
        <span>—</span>
      </div>
      <div class="requirement-item">
        <div class="radio" :style="{ '--background-color': validateMin8Char ? color.green : ((submitted && !validateMin8Char) ? color.red : color.gray) }">
          <div class="radio--tick-mark" v-if="validateMin8Char" />
          <div class="radio--error" v-if="submitted && !validateMin8Char" />
        </div>
        <span :style="{ color: validateMin8Char ? color.greenDark : ((submitted && !validateMin8Char) ? color.red : color.black) }">Must contain at least 8 characters</span>
      </div>
      <div class="requirement-item">
        <div class="radio" :style="{ '--background-color': validateMin1Lowercase ? color.green : ((submitted && !validateMin1Lowercase) ? color.red : color.gray) }">
          <div class="radio--tick-mark" v-if="validateMin1Lowercase"/>
          <div class="radio--error" v-if="submitted && !validateMin1Lowercase" />
        </div>
        <span :style="{ color: validateMin1Lowercase ? color.greenDark : ((submitted && !validateMin1Upercase) ? color.red : color.black) }">Must contain at least 1 lowercase (a-z)</span>
      </div>
      <div class="requirement-item">
        <div class="radio" :style="{ '--background-color': validateMin1Upercase ? color.green : ((submitted && !validateMin1Upercase) ? color.red : color.gray) }">
          <div class="radio--tick-mark" v-if="validateMin1Upercase"/>
          <div class="radio--error" v-if="submitted && !validateMin1Upercase" />
        </div>
        <span :style="{ color: validateMin1Upercase ? color.greenDark : ((submitted && !validateMin1Upercase) ? color.red : color.black) }">Must contain at least 1 uppercase (A-Z)</span>
      </div>
      <div class="requirement-item">
        <div class="radio" :style="{ '--background-color': validateMin1Digit ? color.green : ((submitted && !validateMin1Digit) ? color.red : color.gray) }">
          <div class="radio--tick-mark" v-if="validateMin1Digit"/>
          <div class="radio--error" v-if="submitted && !validateMin1Digit" />
        </div>
        <span :style="{ color: validateMin1Digit ? color.greenDark : ((submitted && !validateMin1Digit) ? color.red : color.black) }">Must contain at least one digit (0-9)</span>
      </div>
      <div class="requirement-item">
        <div class="radio" :style="{ '--background-color': validateMin1SpecChar ? color.green : ((submitted && !validateMin1SpecChar) ? color.red : color.gray) }">
          <div class="radio--tick-mark" v-if="validateMin1SpecChar"/>
          <div class="radio--error" v-if="submitted && !validateMin1SpecChar" />
        </div>
        <span :style="{ color: validateMin1SpecChar ? color.greenDark : ((submitted && !validateMin1SpecChar) ? color.red : color.black) }">Must contain at least 1 special character</span>
      </div>
    </div>
    <br />
    <div v-if="submitted && !validateConfirmPassword" :style="{ color: color.red }">The password you entered does not match.</div>
    <p class="form-item">
      <button-custom 
        :loading="loading" 
        @click="handleSubmit"
      >
        Sign up
      </button-custom>
    </p>
    <p class="form-item">
      <button-custom
        :backgroundColor="color.pink"
        @click="handleCancel"
      >
        Back
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
    username: { type: String, require: true, default: '' },
    email: { type: String, require: true, default: '' }
  },

  data () {
    return { 
      password: '',
      confirmPassword: '',
      loading: false,
      submitted: false,
      color: {
        red: '#DE3235',
        redDark: '#AA0E11',
        green: '#4ABE56',
        greenDark: '#066610',
        pink: '#D03250',
        gray: '#C2D2D7',
        black: '#000'
      }
    }
  },

  computed: {
    validateConfirmPassword () {
      return this.confirmPassword && this.password === this.confirmPassword
    },
    validateMin8Char () {
      return this.password.length >= 8
    },
    validateMin1Lowercase () {
      return /[a-z]/.test(this.password)
    },
    validateMin1Upercase () {
      return /[A-Z]/.test(this.password)
    },
    validateMin1Digit () {
      return /[0-9]/.test(this.password)
    },
    validateMin1SpecChar () {
      return /\W/.test(this.password)
    },
    validateReqAll () {
      return (
        this.validateMin8Char && 
        this.validateMin1Upercase &&
        this.validateMin1Lowercase &&
        this.validateMin1Digit && 
        this.validateMin1SpecChar
      )
    }
  },

  methods: {
    handleSubmit () {
      this.submitted = true
      if (this.validateReqAll && this.validateConfirmPassword) {
        this.handleRegister ({ username: this.username, email: this.email, password: this.password })
      }
    },
    async handleRegister ({ username, email, password }) {
      try {
        this.loading = true
        const data = await api.user.register({ username, email, password })
        console.log(data)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    handleCancel () {
      this.$emit('back', { username: this.username, email: this.email })
    },
    togglePassVisibility (refElement) {
      if (this.$refs[refElement].type === 'password') {
        this.$refs[refElement].type = 'text'
      } else {
        this.$refs[refElement].type = 'password'
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.input-container {
  position: relative;

  .input-icon {
    width: 5%;
    position: absolute;
    top: 30%;
    right: 2%;
    cursor: pointer;
  }
}
.requirement-list {
  padding: 10px 15px;
  border-radius: 6px;
  text-align: left;
  background: #D5E7ED;
  font-size: 1rem;

  .requirement-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .requirement-item {
    display: flex;
    margin: 8px 0;

    .radio {
      position: relative;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: 1px solid gray;
      margin-right: 8px;
      background-color: var(--background-color);

      &--tick-mark, &--error {
        position: absolute;
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        top: 20%;
        left: -20%;
      }

      &--tick-mark::before {
        position: absolute;
        left: 0;
        top: 50%;
        height: 50%;
        width: 2px;
        background-color: #fff;
        content: "";
        transform: translateX(10px) rotate(-45deg);
        transform-origin: left bottom;
      }

      &--tick-mark::after {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 100%;
        background-color: #fff;
        content: "";
        transform: translateX(10px) rotate(-45deg);
        transform-origin: left bottom;
      }

      &--error::before {
        position: absolute;
        left: 50%;
        top: -2%;
        height: 100%;
        width: 2px;
        background-color: #fff;
        content: "";
        transform: translateX(10px) rotate(-45deg);
        transform-origin: left bottom;
      }

      &--error::after {
        position: absolute;
        left: -10%;
        bottom: 0;
        height: 2px;
        width: 100%;
        background-color: #fff;
        content: "";
        transform: translateX(10px) rotate(-45deg);
        transform-origin: left bottom;
      }
    }

  }
}
</style>
