import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import  {Button} from 'react-bootstrap'
import {Navbar,NavItem,NavDropdown,Nav,MenuItem} from 'react-bootstrap';
import Question from './Question';
class App extends Component {
  state = {
    questions: [
       { id: '1',type:'answer', title: "One way to implement deep copy is to add copy constructors to each associated class. A copy constructor takes an instance of 'this' as its single argument and copies all the values from it. Quite some work, but pretty straightforward and safe. EDIT: note that you don't need to use accessor methods to read fields. You can access all fields directly because the source instance is always of the same type as the instance with the copy constructor. Obvious but might be overlooked. Example: Edit: Note that when using copy constructors you need to know the runtime type of the object you are copying. With the above approach you cannot easily copy a mixed list (you might be able to do it with some reflection code). " 
        ,code:"public class Order {private long number;public Order() {}/** * Copy constructor */public Order(Order source) {number = source.number;}}public class Customer {private String name;private List<Order> orders = new ArrayList<Order>();public Customer() {}/** * Copy constructor */public Customer(Customer source) {name = source.name;for (Order sourceOrder : source.orders) {orders.add(new Order(sourceOrder));}}public String getName() {return name;}public void setName(String name) {this.name = name;}}"},
       { id: '2',type:'question', title: "I was presented with this question in an end of module open book exam today and found myself lost. i was reading Head first Javaand both definitions seemed to be exactly the same. i was just wondering what the MAIN difference was for my own piece of mind. i know there are a number of similar questions to this but, none i have seen which provide a definitive answer.Thanks, Darren" },
       { id: '3',type:'answer-accepted-answer', title: "Inheritance is when a 'class' derives from an existing 'class'.So if you have a Person class, then you have a Student class that extends Person, Student inherits all the things that Person has.There are some details around the access modifiers you put on the fields methods in Person, but that's the basic idea.For example, if you have a private field on Person, Student won't see it because its private, and private fields are not visible to subclasses.Polymorphism deals with how the program decides which methods it should use, depending on what type of thing it has.If you have a Person, which has a read method, and you have a Student which extends Person, which has its own implementation of read, which method gets called is determined for you by the runtime, depending if you have a Person or a Student.It gets a bit tricky, but if you do something likePerson p = new Student() p.read()the read method on Student gets called.Thats the polymorphism in action.You can do that assignment because a Student is a Person, but the runtime is smart enough to know that the actual type of p is Student.Note that details differ among languages.You can do inheritance in javascript for example, but its completely different than the way it works in Java." },
       { id: '4',type:'answer', title: "Polymorphism: The ability to treat objects of different types in a similar manner.Example: Giraffe and Crocodile are both Animals, and animals can Move.If you have an instance of an Animal then you can call Move without knowing or caring what type of animal it is.Inheritance: This is one way of achieving both Polymorphism and code reuse at the same time.Other forms of polymorphism:There are other way of achieving polymorphism, such as interfaces, which provide only polymorphism but no code reuse (sometimes the code is quite different, such as Move for a Snake would be quite different from Move for a Dog, in which case an Interface would be the better polymorphic choice in this case.In other dynamic languages polymorphism can be achieved with Duck Typing, which is the classes don't even need to share the same base class or interface, they just need a method with the same name.Or even more dynamic like Javascript, you don't even need classes at all, just an object with the same method name can be used polymorphically." },
       { id: '5',type:'question', title: "I found out that the above piece of code is perfectly legal in Java. I have the following questions. ThanksAdded one more question regarding Abstract method classes.",
        code:"public class TestClass{public static void main(String[] args) {TestClass t = new TestClass();}private static void testMethod(){abstract class TestMethod{int a;int b;int c;abstract void implementMe();}class DummyClass extends TestMethod{void implementMe(){}}DummyClass dummy = new DummyClass();}}" },
       { id: '6',type:'question', title: "In java it's a bit difficult to implement a deep object copy function. What steps you take to ensure the original object and the cloned one share no reference? " },
       { id: '7',type:'answer', title: "You can make a deep copy serialization without creating some files. Copy: Restore:" },
       { id: '8',type:'answer', title: "Java has the ability to create classes at runtime. These classes are known as Synthetic Classes or Dynamic Proxies. See for more information. Other open-source libraries, such as and also allow you to generate synthetic classes, and are more powerful than the libraries provided with the JRE. Synthetic classes are used by AOP (Aspect Oriented Programming) libraries such as Spring AOP and AspectJ, as well as ORM libraries such as Hibernate. " },
       { id: '9',type:'answer', title: "In short: the web server issues a unique identifier to on his visit. The visitor must bring back that ID for him to be recognised next time around. This identifier also allows the server to properly segregate objects owned by one session against that of another. If is: If is: Once he's on the service mode and on the groove, the servlet will work on the requests from all other clients.Why isn't it a good idea to have one instance per client? Think about this: Will you hire one pizza guy for every order that came? Do that and you'd be out of business in no time. It comes with a small risk though. Remember: this single guy holds all the order information in his pocket: so if you're not cautious about, he may end up giving the wrong order to a certain client." },
       { id: '10',type:'answer', title: "A safe way is to serialize the object, then deserialize.This ensures everything is a brand new reference.about how to do this efficiently. Caveats: It's possible for classes to override serialization such that new instances are created, e.g. for singletons.Also this of course doesn't work if your classes aren't Serializable." },
       
    ],
       displayQuestions: false,
       post_no:0,
       current_resp:null,
       homeClicked:false
}
homeClicked =()=>{
  this.setState(
    {displayQuestion:false}
  );
}
displayQuestion = (post_no) => {
  this.setState({
      post_no:post_no,
      displayQuestions:true
  })
}
  get_request(title){
    axios.get('http://localhost:3000/documents/suggest/'+title).then(function(data){
      this.setState({current_resp:data.data});
    })   
                  
  }
   render() {
    let questions= null;
    if ( this.state.displayQuestions ) {
      questions = (
      <div>
           { this.state.questions.map((question, index) => {
                if(question.id==this.state.post_no){
                    var request = require('sync-request');
                    var res = request('GET', 'http://localhost:3000/documents/suggest/'+question.title);
                    var data = JSON.parse(res.getBody());
                    if (typeof(question.code)!="undefined"){
                      return <Question key={question.id}
                      title={question.title}
                      code={question.code}
                      resp={JSON.parse(res.getBody('utf8'))}/>
                    }
                    else{
                      return <Question key={question.id}
                    title={question.title}
                    code={'no code'}
                    resp={JSON.parse(res.getBody('utf8'))}/>
                    }
                       
                }
           })}
      </div>
      );
 }
    return (
      <div>
      <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home" onClick={this.homeClicked}>Java Content Recommender</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            
            <NavItem eventKey={1} href="#" onClick={()=> this.displayQuestion(1)}>
              Post 1
            </NavItem>
            <NavItem eventKey={1} href="#" onClick={()=> this.displayQuestion(2)}>
              Post 2
            </NavItem>
            <NavItem eventKey={1} href="#" onClick={()=> this.displayQuestion(3)}>
              Post 3
            </NavItem>
            <NavItem eventKey={1} href="#" onClick={()=> this.displayQuestion(4)}>
              Post 4
            </NavItem>
            <NavItem eventKey={1} href="#" onClick={()=> this.displayQuestion(5)}>
              Post 5
            </NavItem>
            <NavItem eventKey={1} href="#" onClick={()=> this.displayQuestion(6)}>
              Post 6
            </NavItem>
            <NavItem eventKey={1} href="#" onClick={()=> this.displayQuestion(7)}>
              Post 7
            </NavItem>
            <NavItem eventKey={1} href="#" onClick={()=> this.displayQuestion(8)}>
              Post 8
            </NavItem>
            <NavItem eventKey={1} href="#" onClick={()=> this.displayQuestion(9)}>
              Post 9
            </NavItem>
            <NavItem eventKey={1} href="#" onClick={()=> this.displayQuestion(10)}>
              Post 10
            </NavItem>
          </Nav>
        </Navbar>
        <div className="col-md-12">
          {this.state.displayQuestions?(<p></p>):(<div className="col-md-12">
            <h3>Process</h3>
            <p>
              <li>
                Extract data from <a href="https://en.wikibooks.org/wiki/Java_Programming/">Java Wiki Books</a>
                 and <a href="https://docs.oracle.com/javase/tutorial/index.html">Oracle Java Tutorials</a>
              </li>
              <li>
                Remove Stop words and Use Porter Stemming to process data using 
                <a href="https://github.com/nltk/nltk"> nltk</a>
              </li>
              <li>
                Index all the data using <a href="https://github.com/elastic/elasticsearch-js">Elastic Search(Node.JS)</a>
              </li>
              <li>
                Get the posts from React App(Frontend) 
              </li>
              <li>
              Obtain stems using <a href="https://github.com/NaturalNode/natural">natural</a>
              </li>
              <li>
              Query stems using elastic search and render top 10 recomendations based on scores.
              </li>
              </p>
          </div>)}
          {questions}
          </div>

        </div>
        
    );
  }
}

export default App;
