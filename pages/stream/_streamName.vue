<template>
    <div class="row">
        <div class="col-md-12">
            <card card-body-classes="table-full-width">
                <template slot="header">
                    <h4 slot="header" class="card-title">Stream {{this.$route.params.streamName}}</h4>
                    <p class="category">This is a view of stream data and its details. TODO filter by a key</p>
                    <form @submit.prevent="submitFilter">
                        <div class="form-row">
                            <base-input class="col-md-6" label="Filter by key" v-model="mcFilter.key"/>
                        </div>
                        <base-button type="primary" native-type="Submit">Submit</base-button>
                    </form>
                </template>
                <el-table
                    header-cell-class-name="table-transparent"
                    header-row-class-name="table-transparent"
                    row-class-name="table-transparent"
                    :data="tableData"
                >
                    <el-table-column
                        min-width="150"
                        sortable
                        label="Blocktime"
                    >
                        <template slot-scope="{ row }">
                            {{ formatTimestampToHuman(row.blocktime) }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        min-width="150"
                        sortable
                        label="Keys"
                    >
                        <template slot-scope="{ row }">
                            {{ row.keys}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        min-width="150"
                        sortable
                        label="Creation Transaction"
                    >
                        <template slot-scope="{ row }">
                            {{ row.txid}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        min-width="150"
                        sortable
                        label="Data"
                    >
                        <template slot-scope="{ row }">
                            <el-popover trigger="hover"
                                        placement="top">
                                <div>
                                    <h3 class="popover-header">Click to copy data</h3>
                                    <div class="popover-body">
                                            {{ JSON.stringify(row.data.json)}}
                                    </div>
                                </div>
                                <base-button slot="reference" @click="copyToClipboard(row.data.json)">
                                    Data
                                </base-button>
                            </el-popover>
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
                                <a :href="'/stream/'.concat($route.params.streamName).concat('/item/').concat(row.txid)" class="btn btn-outline-info">Show</a>
                            </div>

                        </template>
                    </el-table-column>
                </el-table>
                <base-pagination type="info" :page-count="10" v-model="defaultPagination"></base-pagination>
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
        const params = context.route.params;
        if (params.key) {
            await context.store.dispatch('stream/liststreamkeyitems', {streamName: params.streamName, key: params.key})
            return;
        }
        await context.store.dispatch('stream/liststreamitems', context.route.params.streamName)
    },
    data() {
        return {
            tableData: this.$store.state.stream.stream,
            mcFilter: {
                key: this.$route.params.key ?? ''
            },
            defaultPagination: 1,
            streamName: this.$route.params.streamName
        };
  },
    methods: {
      formatTimestampToHuman(timestamp) {
          timestamp *= 1000;
          const date = new Date(timestamp)
          return date.toUTCString()
      },
        submitFilter(event) {
            console.log('submit filter!', event)
            // fixme this doesnt work well, only after refresh
            this.$router.push("/stream/".concat(this.streamName).concat("/").concat(this.mcFilter.key))
        },
        copyToClipboard(text) {
            navigator.clipboard.writeText(JSON.stringify(text)).then(() => {
                console.log('Content copied to clipboard');
            },() => {
                console.error('Failed to copy');
            });
        }
    }
};
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>