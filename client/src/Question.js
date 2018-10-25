import React from 'react';
import Highlight from 'react-highlight'
import {ListGroup, ListGroupItem,Button} from 'react-bootstrap'
const Question=(props) =>{
    return (
        <div className="Question">
        <h3>Post</h3>
        <p>{props.title}</p>
        <Highlight className='HTML'>
        {props.code}
        </Highlight>
        <h3>Recommendations</h3>
        <ListGroup>
         {props.resp.hits.hits.map(function(hit, index){
                    return  <ListGroupItem className="row" key={ index }><div className="col-md-10">{hit._source.content}</div>
                            <div className="col-md-2"><Button bsStyle="info" href={hit._source.link}>Link</Button></div>
                            </ListGroupItem>;
                  })}
        
        </ListGroup>
        </div>
    );
}
export default Question;