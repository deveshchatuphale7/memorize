from flask import Flask, request,Response, jsonify
from rake_nltk import Rake
from flask_cors import CORS
import json
from nltk.corpus import stopwords
from rake_nltk import Rake

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "<h1> Working </h1>"

@app.route("/post-test",methods=["POST"])
def hellopost():
    return "<h1> Working </h1>"    

@app.route("/savemap",methods=["POST"])
def saveMap():
    pass

@app.route("/getmap",methods=["POST"])
def generateMap():
    # text = request.args.get("text")
    # language = request.args.get("language")
    reqData = request.get_json(force=True)
    text = reqData["text"]
    print("text")
    print(text)
    stopWords = stopwords.words('english')
    r = Rake(min_length=1,max_length=3,stopwords=stopWords) 
    r.extract_keywords_from_text(text)
    kp = r.get_ranked_phrases_with_scores()
    
    return Response(json.dumps({"keyphrase_data": kp[:100]}), status=200, mimetype='application/json')


if __name__ == "__main__":
    app.run()    

