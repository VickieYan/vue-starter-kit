<template>
  <div class="wrap">
    <grid
      gColumns="repeat(3, 100px)"
      gRows="repeat(3, 100px)">
      <cell
        class="cell"
        :gLeft=1
        :spanWidth=2
        :gTop=1
        :spanHeight=1
        gDisplay
      >1</cell>
      <cell
        class="cell"
        :gLeft=3
        :spanWidth=1
        :gTop=1
        :spanHeight=1
        gDisplay
      >2</cell>
      <cell
        class="cell"
        :gLeft=1
        :spanWidth=1
        :gTop=2
        :spanHeight=2
        gDisplay
      >3</cell>
      <cell
        class="cell"
        :gLeft=2
        :spanWidth=2
        :gTop=2
        :spanHeight=1
        gDisplay
      >4</cell>
      <cell
        class="cell"
        :gLeft=2
        :spanWidth=1
        :gTop=3
        :spanHeight=1
        gDisplay
      >5</cell>
      <cell
        class="cell"
        :gLeft=3
        :spanWidth=1
        :gTop=3
        :spanHeight=1
        gDisplay
      >6</cell>
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
.wrap {
  display: flex;
  justify-content: center;
}
.cell{
  border: 1px solid #000;
}
</style>

