import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  top: {
    margin: "15px 0",
  },
  select: {
    color: "inherit",
    marginLeft: 15,
    height: 45,
  },
}));

export default function Navbar({
  products,
  viewer,
  reviews,
  productId,
  viewerId,
  sortBy,
  handleProductId,
  handleViewerId,
  handlePagination,
  setSortBy,
}) {
  const classes = useStyles();
  return (
    <Grid container className={classes.top} alignItems="center">
      <Grid item xs={4}>
        <Pagination
          count={reviews.length <= 3 ? 1 : Math.ceil(reviews.length / 3)}
          color="secondary"
          onChange={handlePagination}
        />
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" alignItems="center">
          <Select
            labelId="product"
            value={productId}
            variant="outlined"
            onChange={handleProductId}
            className={classes.select}
          >
            {products.map((p, index) => (
              <MenuItem key={index} value={index + 1}>{`Product ${
                index + 1
              }`}</MenuItem>
            ))}
          </Select>
          <Select
            id="viewer"
            value={viewerId}
            variant="outlined"
            onChange={handleViewerId}
            className={classes.select}
          >
            {viewer.map((v, index) => (
              <MenuItem key={index} value={index + 1}>{`Viewer ${
                index + 1
              }`}</MenuItem>
            ))}
          </Select>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Typography variant="body1" color="textPrimary">
            Sort By
          </Typography>
          <Select
            id="sortBy"
            variant="outlined"
            className={classes.select}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="overall">Overall (highest-lowest)</MenuItem>
            <MenuItem value="reviewer">Reviewer Connection</MenuItem>
            <MenuItem value="usefulness">Usefulness</MenuItem>
          </Select>
        </Box>
      </Grid>
    </Grid>
  );
}
