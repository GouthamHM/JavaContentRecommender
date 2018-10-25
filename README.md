# JavaContentRecommender
Using Elastisearch to recommend Java bases posts
1. Install ElasticSearch: https://www.elastic.co/downloads/elasticsearch
2. Install Pyhton3 and NLTK
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
 