export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    field: {
      type: Object,
      required: true
    },
    to: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    const state = {
      '$dirty': false,
      '$active': false,
      '$hasError': false
    }
    this.$set(this.form, this.field.key, state)
  }
}
