from flask import Flask, request,Response, jsonify, render_template
from rake_nltk import Rake
from flask_cors import CORS
import json
from nltk.corpus import stopwords
from rake_nltk import Rake
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from flask_bcrypt import Bcrypt
import re
import csv

bcrypt = Bcrypt()

app = Flask(__name__,  template_folder='templates', static_folder='static')

CORS(app)
cloud_config= {
        'secure_connect_bundle': './secure-connect-memorize.zip'
}

with open('GeneratedToken(1)') as csvDataFile:
    csvReader = list(csv.reader(csvDataFile))
    # print(csvReader)
    tempdata = csvReader[1]
    print(tempdata)
    clientID = tempdata[0]
    clientSecret = tempdata[1]
    print(clientID,clientSecret)

    auth_provider = PlainTextAuthProvider(clientID, clientSecret)
    cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
    session = cluster.connect()

# row = session.execute("select release_version from system.local").one()
# if row:
#     print(row[0])
# else:
#     print("An error occurred.")

@app.route("/")
def hello():
    return "<h1> Working </h1>"
    # return render_template("index.html") 

@app.route("/post-test",methods=["POST"])
def hellopost():
    return "<h1> Working </h1>"    


@app.route("/signup",methods=["POST"])
def signup():
    reqData = request.get_json(force=True)
    email = reqData["email"]
    pwd = reqData["password"]
    name = reqData["name"]
    # pwd = str(bcrypt.generate_password_hash(pwd))
    print(email)
    print(name)
    print(pwd)
    # print(pwd.split("'"))
    q = "INSERT INTO memorize_key.auth (email,name,password) VALUES ('{email}' , '{name}' , '{pwd}');".format(email = email,name = name,pwd = pwd)
    # print("INSERT INTO memorize_key.auth (email,name,password) VALUES ('" + email+"','" + name + '","' + pwd +"');")
    print(q)
    row = session.execute(q)
    print(row)
    return Response(json.dumps({"msg": "Success"}), status=200, mimetype='application/json')


@app.route("/login",methods=["POST"])
def login():
    reqData = request.get_json(force=True)
    email = reqData["email"]
    pwd = reqData["password"]
    
    q = "SELECT email FROM memorize_key.auth WHERE email='{email}' AND password='{pwd}' ALLOW FILTERING".format(email = email,pwd = pwd)
    try:
        row = session.execute(q)
    except:
        return Response(json.dumps({"msg": "not found"}), status=200, mimetype='application/json')        
    print(row)
    print()
    # pwd=bcrypt.generate_password_hash(pwd)
    # print(pwd)
    # print(type(pwd))
    # print(bcrypt.check_password_hash(pwd,reqData["password"]))
    # print(pwd)
    return Response(json.dumps({"msg": row[0]}), status=200, mimetype='application/json')


@app.route("/savemap",methods=["POST"])
def saveMap():
    reqData = request.get_json(force=True)
    id = reqData["id"]
    title = reqData["title"]
    email = reqData["email"]
    text = reqData["text"]
    text = re.sub("(\\d|\\W)+"," ",text)
    # text = text[:5]+"..."
    metaData = reqData["metaData"]
    q = "INSERT INTO memorize_key.map (id,email,title,text,metaData) VALUES ({id} , '{email}', '{title}' , '{text}','{metaData}');".format(id = id,email = email,title = title,text = text,metaData=metaData)
    print(q)
    try:
        row = session.execute(q)
        # print(row)
    except Exception as e:
        print(e) 
        #print(row)
        return Response(json.dumps({"msg": "not found"}), status=200, mimetype='application/json')        
    print(row)
    return Response(json.dumps({"msg": "success"}), status=200, mimetype='application/json')

@app.route("/getallmaps",methods=["POST"])
def getMap():
    reqData = request.get_json(force=True)
    email = reqData["email"]
    q = "SELECT id,email,title,text,metaData FROM memorize_key.map WHERE email='{email}' ALLOW FILTERING".format(email = email)
    # q = "SELECT * FROM memorize_key.auth" 
    try:
        row = session.execute(q)
    except:
        return Response(json.dumps({"msg": "err"}), status=200, mimetype='application/json')        
    print(row)
    print(dir(row))
    print(type(row))
    rd = list()
    for o in row:
        rd.append(o)
    return Response(json.dumps({"msg": rd}), status=200, mimetype='application/json')



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


# if __name__ == "__main__":
    # app.run()    

# CREATE TABLE cycling.cyclist_alt_stats ( id UUID PRIMARY KEY, lastname text, birthday timestamp, nationality text, weight text, height text );
# CREATE TABLE memorize_key.auth ( email text PRIMARY KEY, name text, password text);

# INSERT INTO [keyspace_name.] table_name (column_list) VALUES (column_values);

# CREATE TABLE memorize_key.map ( id int PRIMARY KEY, title text, text text,tags list,createdOn date, words list);

# CREATE TABLE memorize_key.map ( id int PRIMARY KEY, title text, text text,metaData text);