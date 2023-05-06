<template>
    <div class="row">
        <div class="col-md-12">
            <card card-body-classes="table-full-width">
                <template slot="header">
                    <h4 slot="header" class="card-title">asset item with Transaction ID {{ this.$route.params.hashedId }}</h4>
                    <p class="category">TODO prepare some comprehensive display of data</p>
                </template>
                <table class="col-md-12">
                    <tr>
                        <td>Asset Name</td>
                        <td>{{asset.name}}</td>
                    </tr>
                    <tr>
                        <td>Transaction ID</td>
                        <td>{{asset.issuetxid}}</td>
                    </tr>
                    <tr>
                        <td>Fungible:</td>
                        <td>{{asset.fungible ? "Fungible" : "NON-Fungible"}}</td>
                    </tr>
                    <tr>
                        <td>Details</td>
                        <td>{{asset.details}}</td>
                    </tr>
                </table>

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
      console.log(context.route.params)
        await context.store.dispatch('assets/listassets', context.route.params.assetName)
    },
    data() {
        return {
            asset: this.$store.state.assets.assets[0],
        };
  },
};
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>