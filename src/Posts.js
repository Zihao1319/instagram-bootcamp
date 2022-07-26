// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

// const Posts = (props) => {
//   console.log("huat");
//   return (
//     <Card style={{ width: "18rem" }}>
//       <Card.Img variant="top" src={props.imageUrl} />
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Text>{props.caption}</Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Posts;

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Posts = (props) => {
  console.log(props);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.imageUrl}
        alt={props.caption}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          XXX
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.caption}{" "}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Posts;
