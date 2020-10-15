<template>
  <div>
    <base-header class="mb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-card-body>
          <form>
            <base-input label="Enter encode/decode text here">
              <textarea
                id="exampleFormControlTextarea3"
                class="form-control"
                rows="3"
                v-model="inputText"
              />
            </base-input>
            <div class="text-left">
              <base-button
                v-on:click="encode"
                type="primary"
                native-type="submit"
                class="my-4"
              >
                encode
              </base-button>
              <base-button
                v-on:click="decode"
                type="primary"
                native-type="submit"
                class="my-4"
              >
                decode
              </base-button>
            </div>
          </form>
        </b-card-body>
      </b-row>
      <b-row>
        <b-card-body v-if="outputText">
          <base-input label="Output text">
            <figure class="highlight">
              <code id="outputText" class="form-control">
                {{ outputText }}
                <base-button
                  v-on:click="doCopy"
                  size="sm"
                  outline
                  type="primary"
                  class="float-right"
                  >copy
                </base-button>
              </code>
            </figure>
          </base-input>
        </b-card-body>
      </b-row>
      <div class="mt-5" />
    </b-container>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      inputText: "",
      outputText: "",
    };
  },
  methods: {
    encode() {
      this.outputText = btoa(this.inputText);
    },
    decode() {
      this.outputText = atob(this.inputText);
    },
    //TODO: Make this a component so that it can be reused in all pages
    doCopy() {
      this.$copyText(this.outputText).then(
        function (e) {},
        function (e) {}
      );
    },
  },
};
</script>
<style>
.el-table.table-dark {
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
  border-bottom: none;
}
</style>
