import styled from 'vue-styled-components'

const gridProps = {
  className: String,
  gHeight: String,               // 容器高度
  gWidth: String,                // 容器宽度
  gRows: [String, Number],       // grid-template-rows
  gColumns: [String, Number],    // grid-template-columns
  gAreas: Array,                 // grid-template-areas
  gap: String,                   // grid-gap
  justifyItems: String,          // justify-items
  alignItems: String,            // align-items
  justifyContent: String,        // justify-content
  alignContent: String,          // align-content
  gFlow: String,                 // grid-auto-flow
  minRowHeight: String,          
  minColumsWidth: String,
}

const height = ({ gHeight }) => gHeight && `height: ${gHeight}`

const width = ({ gWidth }) => gWidth && `width: ${gWidth}`

const rows = ({ gRows = 1 }) => typeof gRows === "number" ? `repeat(${gRows}, 1fr)` : gRows

const columns = ({ gColumns = 12 }) => typeof gColumns === "number" ? `repeat(${gColumns}, 1fr)` : gColumns

const gap = ({ gap = '8px' }) => `${gap} ${gap}`

const formatAreas = areas => areas.map(area => `"${area}"`).join(" ")

const gridTemplateAreas = ({ gAreas }) => gAreas && `grid-template-areas: ${formatAreas(gAreas)}`

const justifyItems = ({ justifyItems }) => justifyItems && `justify-items: ${justifyItems}`

const alignItems = ({ alignItems }) => alignItems && `align-items: ${alignItems}`

const justifyContent = ({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`

const alignContent = ({ alignContent }) => alignContent && `align-content: ${alignContent}`

const flow = ({ gFlow = 'row' }) => gFlow

const autoRows = ({ minRowHeight = '20px' }) => `minmax(${minRowHeight}, auto)`

const autoColums = ({ minColumsWidth = '20px' }) => `minmax(${minColumsWidth}, auto)`



const Grid = styled('div', gridProps)`
  display: grid;
  grid-template-rows: ${rows};
  grid-template-columns: ${columns};
  grid-gap: ${gap};
  grid-auto-flow: ${flow};
  grid-auto-rows: ${autoRows};
  grid-auto-columns: ${autoColums};
  ${gridTemplateAreas};
  ${justifyItems};
  ${alignItems};
  ${justifyContent};
  ${alignContent};
  ${height};
  ${width};
`

export default Grid