import { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Navbar from "./components/Navbar";
import ProductReviews from "./components/ProductReviews";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50px, -50px)",
  },
}));

function App() {
  const classes = useStyles();
  const [product, setProduct] = useState();
  const [productId, setProductId] = useState(1);
  const [viewerId, setViewerId] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [expanded, setExpanded] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  // Logic for displaying current reviews
  let currentReviews = [];
  if (product && product.reviews) {
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    currentReviews = product.reviews.slice(
      indexOfFirstReview,
      indexOfLastReview
    );
  }

  const handleProductId = (e) => {
    setProductId(e.target.value);
  };

  const handleViewerId = (e) => {
    setViewerId(e.target.value);
  };

  const handlePagination = (e, page) => {
    setCurrentPage(page);
    setExpanded(false);
  };

  // Fetching
  useEffect(() => {
    const fetchReviews = async (e) => {
      const repsonse = await fetch(
        `http://www.i2ce.in/reviews/${productId}/${viewerId}`
      );
      const data = await repsonse.json();
      setProduct(data);
      setExpanded(false);
      setSortBy("default");
    };

    fetchReviews();
  }, [productId, viewerId]);

  // SORTING
  useEffect(() => {
    if (product) {
      const handleSortBy = (type) => {
        let sortedReviews;
        if (type === "overall") {
          sortedReviews = [...product.reviews].sort(
            (a, b) => b.ratings.Overall - a.ratings.Overall
          );
        } else if (type === "reviewer") {
          sortedReviews = [...product.reviews].sort(
            (a, b) => b.reviewer.connection_level - a.reviewer.connection_level
          );
        } else if (type === "usefulness") {
          sortedReviews = [...product.reviews].sort(
            (a, b) => b.usefulness - a.usefulness
          );
        } else {
          sortedReviews = [...product.reviews].sort();
        }

        // console.log(sortedReviews);
        setProduct((p) => ({ ...p, reviews: sortedReviews }));
        // sortProducts(sorted);
      };
      handleSortBy(sortBy);
      setExpanded(false);
    }
  }, [sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  const createOptions = (limit) => {
    return Array(limit).fill("_");
  };

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        {product && (
          <Navbar
            products={createOptions(20)}
            viewer={createOptions(10)}
            reviews={product.reviews}
            productId={productId}
            viewerId={viewerId}
            sortBy={sortBy}
            handleProductId={handleProductId}
            handleViewerId={handleViewerId}
            handlePagination={handlePagination}
            setSortBy={setSortBy}
          />
        )}

        {currentReviews.length ? (
          currentReviews.map((r, index) => (
            <ProductReviews
              key={index}
              title={r.title}
              comment={r.comment}
              ratings={r.ratings}
              usefulness={r.usefulness}
              friend={r.friend}
              name={r.reviewer.name}
              expanded={expanded}
              setExpanded={setExpanded}
              index={index}
            />
          ))
        ) : (
          <div className={classes.loader}>
            <CircularProgress color="primary" />
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
