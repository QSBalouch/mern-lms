import React from "react";
import {Card,Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function CourseCard({course,enroll}){

return(

<Card className="shadow mb-3">

<Card.Body>

<Card.Title>{course.title}</Card.Title>

<Card.Text>{course.description}</Card.Text>

<Button
as={Link}
to={`/course/${course._id}`}
className="me-2"
>
View
</Button>

<Button
variant="success"
onClick={()=>enroll(course._id)}
>
Enroll
</Button>

</Card.Body>

</Card>

)

}

export default CourseCard;