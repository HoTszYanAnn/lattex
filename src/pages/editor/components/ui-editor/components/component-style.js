
import {
  TextField,
  Box,
  Tooltip,
  withStyles
} from '@material-ui/core'

export const NoMarginTooltip = withStyles((theme) => ({
  tooltip: {
    margin: 0,
    fontSize: 12
  },
}))(Tooltip);