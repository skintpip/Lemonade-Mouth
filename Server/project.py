import pymongo
import certifi

ca = certifi.where()

client = pymongo.MongoClient(
    "mongodb+srv://jkressbach:CIrRa3yVV8dhnfKT@cluster0.v1qezrw.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=ca)
db = client["Projects"]
projectColl = db["Project1"]


class Project:

    def __init__(self):
        ID = ""

    # creates project (userList must be passed as a list)
    def createNewProject(self, ID, userList):
        projectColl.insert_one({"Project ID": ID, "Users": userList}).inserted_id

    # update list of users added to a project (called in joiProject)
    def setUsers(self, ID, UserList):
        toUpdate = {"Project ID": ID}
        newInfo = {"$set": {"Project ID": ID, "Users": UserList}}
        projectColl.update_one(toUpdate, newInfo)

    # checks if a user has been added to a project
    def userInProject(self, ID, user):
        userList = self.getUserList(ID)
        if user in userList:
            return True
        return False

    # adds user to project (returning varying errors if needed)
    def joinProject(self, ID, user):
        if self.doesProjectExist(ID):
            if self.userInProject(ID):
                return "Error: " + user + " already part of project!"  # change to simple already added error notif
            else:
                userList = self.getUserList(ID)
                userList.append(user)
                self.setUsers(ID, userList)
        else:
            return "invalid project ID, please try again or create a new project"  # change to simple invalid id notif

    # checks for valid Project ID
    def doesProjectExist(self, ID):
        if projectColl.find({"Project ID": {"$in": ID}}).count() > 0:
            return True
        return False

    # returns list of users in a project for editability
    def getUserList(self, ID):
        return projectColl.find({"Project ID": ID})[0].get("Users")

    # returns list of projects a user is enrolled in (to display on webpage after a user is logged in
    def getEnrolledProjects(self, user):
        enrolledProjectList = []
        projects = projectColl.find()
        for project in projects:
            projectID = project.get("Project ID")
            if self.userInProject(projectID, user):
                enrolledProjectList.append(projectID)
        return enrolledProjectList
