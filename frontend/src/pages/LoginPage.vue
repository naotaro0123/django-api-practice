<template>
  <div id="login-page">
    <global-header />
    <global-message />

    <main class="contaner">
      <p class="h5 mb-4">ログイン</p>
      <b-form @submit.prevent="submitLogin">
        <div class="row form-group">
          <label class="col-sm-3 col-form-label">ユーザー名</label>
          <div class="col-sm-8">
            <b-form-input type="text" v-model="form.username" required />
          </div>
        </div>
        <div class="row form-group">
          <label class="col-sm-3 col-form-label">パスワード</label>
          <div class="col-sm-8">
            <b-form-input type="password" v-model="form.password" required />
          </div>
        </div>
        <div class="row text-center mt-5">
          <div class="col-sm-12">
            <b-button type="submit" variant="primary">ログイン</b-button>
          </div>
        </div>
      </b-form>
    </main>
  </div>
</template>

<script>
import GlobalHeader from '@/components/GlobalHeader'
import GlobalMessage from '@/components/GlobalMessage'

export default {
  components: {
    GlobalHeader,
    GlobalMessage
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitLogin() {
      this.$store.dispatch('auth/login', {
        username: this.form.username,
        password: this.form.password
      })
      .then(() => {
        console.log('Login succeeded.')
        this.$store.dispatch('message/setInfoMessage', {
          message: 'ログインしました。'
        })
        const next = this.$route.query.next || '/'
        this.$router.replace(next)
      })
    }
  }
}
</script>