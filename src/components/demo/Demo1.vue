<template>
  <div>
    <grid
      gColumns="300px 1fr 300px"
      gRows="50px 200px 50px">
      <cell
        class="cell"
        :gLeft=1
        :spanWidth=3
        :gTop=1
        :spanHeight=1
        gDisplay
      >header</cell>
      <cell
        class="cell"
        :gLeft=2
        :spanWidth=1
        :gTop=2
        :spanHeight=1
        gDisplay
      >main</cell>
      <cell
        class="cell"
        :gLeft=1
        :spanWidth=1
        :gTop=2
        :spanHeight=1
        gDisplay
      >left</cell>
      <cell
        class="cell"
        :gLeft=3
        :spanWidth=1
        :gTop=2
        :spanHeight=1
        gDisplay
      >right</cell>
      <cell
        class="cell"
        :gLeft=1
        :spanWidth=3
        :gTop=3
        :spanHeight=1
        gDisplay
      >footer</cell>
    </grid>
  </div>
</template>
<script>
import { Grid, Cell } from '../common/GridLayout'
export default {
  components: { Grid, Cell }
}
</script>
<style>
.cell{
  border: 1px solid #000;
}
</style>

