<template>
  <div class="page-wrapper downlinerep-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="page-card downlinedata-card">
            <slot name="topPagination" />
            <slot name="table" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SimplePage",
};
</script>
<style src="../../assets/css/simple-page.css"></style>
