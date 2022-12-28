<template>
  <div class="table-responsive" ref="tableContainer">
    <table class="table">
      <thead>
        <tr>
          <th  v-for="column in columns" :key="column.label">
            {{ column }}
          </th>
        </tr>
      </thead>
      <slot name="tableBody"></slot>
    </table>
  </div>
</template>
<script>
export default {
  name: "SimpleTable",
  props: {
    columns: {
      required: true,
    },
  },
};
</script>