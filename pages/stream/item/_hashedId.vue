<template>
    <div class="row">
        <div class="col-md-12">
            <card card-body-classes="table-full-width">
                <template slot="header">
                    <h4 slot="header" class="card-title">Stream item with Transaction ID {{ this.$route.params.hashedId }}</h4>
                    <p class="category">TODO prepare some comprehensive display of data</p>
                </template>
                <table class="col-md-12">
                    <tr>
                        <td>Transaction ID</td>
                        <td>{{streamItem.txid}}</td>
                    </tr>
                    <tr>
                        <td>Block Time</td>
                        <td>{{streamItem.blocktime}}</td>
                    </tr>
                    <tr>
                        <td>blockhash:</td>
                        <td>{{streamItem.blockhash}}</td>
                    </tr>
                    <tr>
                        <td>time:</td>
                        <td>{{streamItem.time}}</td>
                    </tr>
                    <tr>
                        <td>timereceived:</td>
                        <td>{{streamItem.timereceived}}</td>
                    </tr>
                    <tr>
                        <td>Raw data:</td>
                        <td>{{JSON.stringify(streamItem.data.json)}}</td>
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
        await context.store.dispatch('streamItem/getstreamitem', {
            stream: context.route.params.streamName,
            txid: context.route.params.transactionId
        })
    },
    data() {
        return {
            streamItem: this.$store.state.streamItem.streamItem,
        };
  },
};
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>