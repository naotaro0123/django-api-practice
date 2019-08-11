// CSRFトークンの送信設定
axios.defaults.xsrfCookieName = 'csfrtoken'
axios.defaults.xsffHeaderName = 'X-CSRFToken'
// クロスドメイン用
axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: '/api/v1/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

Vue.options.delimiters = ['#{', '}']

const app = new Vue({
  el: '#app',
  data: {
    form: {
      book: {
        title: '',
        price: 0,
      }
    },
    message: {
      info: '',
      warnings: [],
      error: ''
    }
  },
  computed: {
    isCreated() {
      return this.form.book.id !== undefined
    }
  },
  methods: {
    submitSave() {
      this.clearMessages()
      api({
        method: this.isCreated ? 'put' : 'post',
        url: this.isCreated ? `/books/${this.form.book.id}/` : '/books/',
        data: {
          id: this.form.book.id,
          title: this.form.book.title,
          price: this.form.book.price
        }
      })
      .then(response => {
        this.message.info = this.isCreated ? '更新しました。' : '登録しました',
        this.form.book = response.data
      })
      .catch(error => {
        const status = error.response ? error.response.status : 500
        if (status === 400) {
          this.message.warnings = [].concat.apply([], Object.values(error.response.data))
        } else if (status === 401) {
          this.message.error = '認証エラー'
        } else if (status === 403) {
          this.message.error = '権限エラー'
        } else {
          tis.message.error = '想定外エラー'
        }
      })
    },
    clearMessages() {
      this.message.error = ''
      this.message.warnings = []
      this.message.info = ''
    }
  }
})