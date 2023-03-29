from flask import Flask, jsonify
import certifi
import pymongo
import hardwareSet
import cipher
import project
import user
import os

app = Flask(__name__)


@app.route('/')
def index():
    return app.send_static_file('index.html')


# Create the server-side code (backend) for the front-end code that you created. As
# part of this task, you are required to create the following functions:


# This function queries the projectId and quantity from the URL and returns the project id and quantity to the front
# end. The front end displays a pop - up message which says “ < qty > hardware checked in”
@app.route('/checkedIn/<hwSet>/<projectId>/<qty>')
def checkIn_hardware(hwSet, projectId, qty):
    hwSet1 = hardwareSet.hardwareSet(hwSet)
    ca = certifi.where()
    client = pymongo.MongoClient(
        "mongodb+srv://jkressbach:CIrRa3yVV8dhnfKT@cluster0.v1qezrw.mongodb.net/?retryWrites=true&w=majority",
        tlsCAFile=ca)
    db = client["HardwareSet"]
    posts = db[hwSet]
    hwSet1.mongo_check_in_item(posts, hwSet, qty)
    0


# This function queries the projectId and quantity from the URL and returns the
# project id and quantity to the front end. The front end displays a pop-up message
# which says “<qty> hardware checked out”
@app.route('/checkedOut/<hwSet>/<projectId>/<qty>')
def checkOut_hardware(hwSet, projectId, qty):
    return {"projectID": [projectId], "checkedOut": [qty]}


# This function queries the projectId from the URL and returns the project id to the
# front end. The front end displays a pop-up message which says “Joined <projectId>”
@app.route('/join/<hwSet>/<projectId>')
def joinProject(projectId, hwSet):
    return {"projectID": [projectId]}


# This function queries the projectId from the URL and returns the project id to the
# front end. The front end displays a pop-up message which says “Left <projectId>”
@app.route('/leave/<hwSet>/<projectId>')
def leaveProject(projectId, hwSet):
    return {"projectID": [projectId]}


@app.route('/login/<username>/<password>')
def userLogin(username, password):
    currentUser = user.User(username, password)
    if not currentUser.doesUserAndPassExist(username,password):
        currentUser.createNewUser(username, password)
        return {"username": [username]}
    else:
        return {"username": [username]}


@app.route('/test/<projectId>')
def testPrint():
    return {"members": [5555, 5656, 5657]}


@app.route('/projects/<user>')
def userProjects(user):
    enrolledProjects = []
    currentProjects = project.Project()
    enrolledProjects = currentProjects.getEnrolledProjects(user)
    return {"projects": enrolledProjects}


# @app.errorhandler('/404')
# def not_found(e):
#     return


# app.send_static_file('index.html')

if __name__ == "__main__":
    # app.run(debug=False)
    app.run(host='0.0.0.0', debug=False, port=os.environ.get("PORT", 5000))
