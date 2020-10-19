<template>
  <div>
    <base-header class="mb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <b-container 
      fluid 
      class="mt--7">
      <b-row>
        <b-card-body>
          <form>
            <base-input label="Paste SAML metadata here">
              <textarea
                id="exampleFormControlTextarea3"
                v-model="samlText"
                class="form-control"
                rows="3"
              />
            </base-input>
            <div class="text-left">
              <base-button
                type="primary"
                native-type="submit"
                class="my-4"
                @click="parseXML(samlText)"
              >
                Process XML
              </base-button>
            </div>
          </form>
        </b-card-body>
      </b-row>
      <div class="mt-5" />
    </b-container>
  </div>
</template>
<script>
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
} from "element-ui";
import { parseMetaData } from "../util/SAMLUtil";
export default {
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      samlText: "",
    };
  },
  methods: {
    parseXML(samlText) {
      console.log(parseMetaData(samlText));
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
