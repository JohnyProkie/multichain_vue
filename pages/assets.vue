<template>
    <div class="row">
      <div class="col-md-12">
        <card card-body-classes="table-full-width">
          <template slot="header">
              <h4 slot="header" class="card-title">Assets</h4>
              <p class="category">List of assets</p>
          </template>
        <el-table :data="tableData"
                  header-cell-class-name="table-transparent"
                  header-row-class-name="table-transparent"
                  row-class-name="table-transparent"
        >
            <el-table-column
                min-width="150"
                sortable
                label="Name"
                property="name"
            ></el-table-column>
            <el-table-column
                min-width="150"
                sortable
                label="Creation Transaction"
                property="issuetxid"
            ></el-table-column>
            <el-table-column
                min-width="150"
                sortable
                label="Fungible"
                property="fungible"
            >
                <template slot-scope="{row}">
                    {{row.fungible ? "Fungible" : "NON-Fungible"}}
                </template>
            </el-table-column>
            <el-table-column
                min-width="150"
                sortable
                label=""
                property=""
            >
                <template slot-scope="{ row }">
                    <div class="btn-group">
                        <a :href="'/asset/'.concat(row.name)" class="btn btn-outline-info">Show</a>
                    </div>

                </template>
            </el-table-column>
        </el-table>
      </card>
    </div>

  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui';

export default {
  name: 'regular',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
    async asyncData (context) {
        await context.store.dispatch('assets/listassets')
    },
    data() {
    return {
        tableData: this.$store.state.assets.assets,
    };
  }
};
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>