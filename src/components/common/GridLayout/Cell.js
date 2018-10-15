import styled from 'vue-styled-components'

const cellProps = {
  className: String,
  gHeight: Number,
  gWidth: Number,
  gLeft: [Number, String],
  gTop: [Number, String],
  gArea: String,
  justifySelf: String,
  alignSelf: String,  
  spanHeight: Number,
  spanWidth: Number,
  gDisplay: Boolean
}


const height = ({ gHeight }) => gHeight && `height: ${gHeight}`

const width = ({ gWidth }) => gWidth && `width: ${gWidth}`

const gridColumnStart = ({ gLeft }) => gLeft && `grid-column-start: ${gLeft}`

const gridRowStart = ({ gTop }) => gTop && `grid-row-start: ${gTop}`

const gridArea = ({ gArea }) => gArea && `grid-area: ${gArea}`

const justifySelf = ({ justifySelf }) => justifySelf && `justify-self: ${justifySelf}`

const alignSelf = ({ alignSelf }) => alignSelf && `align-self: ${alignSelf}`

const display = ({ gDisplay }) => !gDisplay && `display: none`


const Cell = styled('div', cellProps)`
  ${height};
  ${width};
  ${gridColumnStart};
  ${gridRowStart};
  grid-column-end: ${({ spanWidth = 1 }) => `span ${spanWidth}`};
  grid-row-end: ${({ spanHeight = 1 }) => `span ${spanHeight}`};
  ${gridArea};
  ${justifySelf};
  ${alignSelf};
  ${display};
  overflow: auto;
`

export default Cell
