from bs4 import BeautifulSoup
from nltk.corpus import stopwords 
from nltk.tokenize import word_tokenize
from nltk.stem.porter import PorterStemmer 
import requests
import json
import os
from pathlib import Path
import codecs
java_url = "https://docs.oracle.com/javase/tutorial/"
origin = "https://en.wikibooks.org"
curr_path = os.getcwd()

dir = Path(curr_path+"/data")
if dir.is_dir():
    print("Already exists")
else:
    os.mkdir(curr_path+'/data')

html = requests.get(java_url)

data = html.text

soup = BeautifulSoup(data)
link_list = set()
for h3 in soup.find_all('h2'):
    ul = h3.findNext('ul')
    for li in ul.find_all('li'):
        
        if len(li.find_all('a')):
            #if (li.find_all('a')[-1]['href']).startswith('/wiki/Java_Programming/'):
            link_list.update([java_url+li.find_all('a')[0]['href']])
print(link_list)

def create_json(content,file_no,link):
    dict = {
        'content':content,
        'stemmed':'',
        'link':link
    }
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(content)
    filtered_sentence = [w for w in word_tokens if not w in stop_words] 
    filtered_sentence = [] 
    for w in word_tokens: 
        if w not in stop_words: 
            filtered_sentence.append(w)
    #print(word_tokens)
    #print(filtered_sentence)
    porter_stemmer = PorterStemmer()
    stemmed_words = []
    for word in filtered_sentence:
         stemmed_words.append(porter_stemmer.stem(word))
    if len(stemmed_words):
        dict['stemmed']=u' '.join(stemmed_words)
        with codecs.open(str(dir)+"/"+str(file_no)+".json",'w+','utf-8') as json_file:
            json_file.write(json.dumps(dict))

for ind,p in enumerate(soup.find_all('p')):
     path, dirs, files = next(os.walk(str(dir)))
     if p.text:
        create_json(p.text,len(files)+1,java_url)
print(link_list )
for link in link_list:
    html = requests.get(link)
    data = html.text
    soup = BeautifulSoup(data)
    if soup.find('div',id='PageContent'):
        for ind,p in enumerate(soup.find('div',id='PageContent').find_all('p')):
            path, dirs, files = next(os.walk(str(dir)))
            #exclude_list = ['About Oracle','Contact Us','Legal Notices','Terms of Use','']
            if p.text:
                if link=="https://docs.oracle.com/javase/tutorial/collections/index.html":
                    print(p.text)
                create_json(p.text,len(files)+1,link)


  