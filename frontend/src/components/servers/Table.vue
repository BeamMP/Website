<template>
  <div class="table-container">
    <table class="min-w-full divide-y divide-gray-400">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" class="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in data" :key="item.id">
          <tr @click="selectRow(item.id)" class="servers-table-row">
            <td v-for="column in columns" :key="column.key" class="px-6 py-1 whitespace-no-wrap text-sm leading-5 text-gray-600" :style="item.style" >
              <template v-if="column.key == 'location'">
                <span style="display:flex;width: 125px;">
                  <img :src="`/src/assets/flags/${item.cc}.png`" alt="" style="padding-right: 10px;">
                  <span style="position: absolute;left: 105px;">{{ item[column.key] }}</span>
                </span>
              </template>
              <template v-else-if="column.key == 'name'">
                <span v-for="(value, name) in item[column.key]" :style="value.f">{{ value.s }}</span>
              </template>
              <template v-else>
                {{ item[column.key] }}
              </template>
            </td>
          </tr>
          <tr v-if="selectedRow == item.id">
            <td :colspan="columns.length">
              <ExpandedRowDetails :rowData="getExpandedRowData(item)" />
            </td>
          </tr>
        </template>
        <template v-if="data == []">
          <tr>
            <td>
              No Servers Found.
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import ExpandedRowDetails from "@/components/servers/ExpandedRowDetails.vue";

export default {
  components: {
    ExpandedRowDetails,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedRow: null,
    };
  },
  mounted() {
    console.log(this.props)
  }, 
  methods: {
    selectRow(id) {
      if (this.selectedRow === id) {
        this.selectedRow = null;
      } else {
        this.selectedRow = id;
      }
    },
    getExpandedRowData(item) {
      return item || {}
    },
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}
.servers-table-row:hover {
  background-color: rgba(0, 0, 0, 0.25);
}
</style>
