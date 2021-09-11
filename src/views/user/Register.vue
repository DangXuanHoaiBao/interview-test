<template>
  <div class="signup">
    <img class="image-left" src="../../assets/images/image1.svg" />
    <img class="image-right" src="../../assets/images/image2.svg" />
    <div class="signup--content">
      <transition name="component-fade" mode="out-in">
        <form>
          <register-step-1
            v-if="step === 1"
            :username-prop="username"
            :email-prop="email"
            @next="nextStep"
          />
          <register-step-2
            v-if="step === 2"
            :username="username"
            :email="email"
            @back="goBack"
          />
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import RegisterStep1 from "@/components/Register/Step1.vue";
import RegisterStep2 from "@/components/Register/Step2.vue";
export default {

  components: { RegisterStep1, RegisterStep2 },

  data() {
    return {
      step: 1,
      username: "",
      email: ""
    };
  },

  methods: {
    nextStep({ username, email }) {
      this.step = 2;
      this.username = username;
      this.email = email;
    },
    goBack({ username, email }) {
      this.step = 1;
      this.username = username;
      this.email = email;
    }
  }
};
</script>
<style lang="scss" scoped>
.signup {
  position: relative;
  width: 420px;
  margin: 50px auto 0 auto;
  padding: 8px;
  border-radius: 20px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(109, 189, 215, 0.5) 0%,
    rgba(49, 126, 177, 0.2) 100%
  );

  .image-left {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 3rem;
    z-index: 2;
  }
  .image-right {
    position: absolute;
    top: -6px;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  &--content {
    background: #ffffff;
    opacity: 0.9;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 80px 20px 10px 20px;
    text-align: center;
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}

//iphone 4 inch (xxs)
@media only screen and (min-width: 0) {
  .signup {
    width: 98%;
    margin: 20px auto 0 auto;
  }
}

//iphone 4.7 -> 5.8 inch (xs)
@media only screen and (min-width: 480px) {
  .signup {
    width: 80%;
    margin: 20px auto 0 auto;
  }
}

//ipad min && iphone large 5.8 - 6.5 (sm)
@media only screen and (min-width: 576px) {
  .signup {
    width: 70%;
    margin: 20px auto 0 auto;
  }
}

//ipad (md)
@media only screen and (min-width: 768px) {
  .signup {
    width: 60%;
    margin: 20px auto 0 auto;
  }
}

//ipad pro (lg)
@media only screen and (min-width: 1024px) {
  .signup {
    width: 400px;
    margin: 50px auto 0 auto;
  }
}

//desktop (xl)
@media only screen and (min-width: 1280px) {
  .signup {
    width: 400px;
    margin: 50px auto 0 auto;
  }
}
</style>
