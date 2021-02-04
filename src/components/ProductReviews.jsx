import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontWeight: 500,
  },
  star: {
    color: "gold",
  },
  avatar: {
    marginRight: 8,
    width: 24,
    height: 24,
  },
  person: {
    marginBottom: 8,
  },
  usefulness: {
    marginRight: 5,
  },
  rating: {
    width: 200,
  },
});

export default function ProductReviews({
  title,
  comment,
  ratings,
  usefulness,
  friend,
  name,
  expanded,
  setExpanded,
  index,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {friend ? (
          <Box display="flex" alignItems="center" className={classes.person}>
            <Avatar src="" alt=" " className={classes.avatar} />
            <Typography variant="body1">{name}</Typography>
          </Box>
        ) : (
          ""
        )}
        <Rating name="read-only" value={ratings.Overall} readOnly />

        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {comment}
        </Typography>

        <Box display="flex" alignItems="center">
          <Typography
            variant="body1"
            color="textPrimary"
            className={classes.usefulness}
          >
            Usefulness
          </Typography>
          <Rating
            name="read-only"
            value={usefulness / 2}
            readOnly
            precision={0.5}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => setExpanded(expanded === index ? false : index)}
        >
          {expanded === index ? "Show Less" : "Show More"}
        </Button>
      </CardActions>
      <Collapse in={expanded === index} timeout="auto" unmountOnExit>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.rating}
            >
              Delivery Time
            </Typography>
            <Rating name="read-only" value={ratings.delivery_time} readOnly />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.rating}
            >
              Discounts and Offers
            </Typography>
            <Rating
              name="read-only"
              value={ratings.discounts_and_offers}
              readOnly
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.rating}
            >
              Matches Description
            </Typography>
            <Rating
              name="read-only"
              value={ratings.matches_description}
              readOnly
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.rating}
            >
              Matches Photo
            </Typography>
            <Rating name="read-only" value={ratings.matches_photo} readOnly />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.rating}
            >
              Packaging
            </Typography>
            <Rating name="read-only" value={ratings.packaging} readOnly />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.rating}
            >
              Price
            </Typography>
            <Rating name="read-only" value={ratings.price} readOnly />
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
