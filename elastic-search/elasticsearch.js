var elasticsearch = require('elasticsearch');
var sw = require('stopword');
var natural = require('natural');
var elasticClient = new elasticsearch.Client({  
    host: 'localhost:9200',
    log: 'info'
});
var indexName = "javaindex";
/**
* Delete an existing index
*/
function deleteIndex() {  
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;
/**
* create the index
*/
function initIndex() {  
    console.log(indexExists());
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {  
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function addDocument(document) {  
    //console.log(document);
    return elasticClient.index({
        index: indexName,
        type: "document",
        body: {
            //title: document.title,
            content: document.content,
            stemmed: document.stemmed,
            link: document.link
        }
    });
}
exports.addDocument = addDocument;

function getSuggestions(input) {
    const oldString = input.split(' ');
    input_after_sw = sw.removeStopwords(oldString);
    input =  natural.PorterStemmer.tokenizeAndStem(input_after_sw.join(' ')).join(' ');
    
    return elasticClient.search({
        index: indexName,
        type: "document",
        body: {
            query: {
                match: {
                    "stemmed": input
                }
            }
        }
    });
}
exports.getSuggestions = getSuggestions;