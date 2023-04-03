import pymongo
import certifi

ca = certifi.where()

client = pymongo.MongoClient(
    "mongodb+srv://jkressbach:CIrRa3yVV8dhnfKT@cluster0.v1qezrw.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=ca)
dbP = client["Projects"]
projectColl = dbP["Project1"]


class Project:

    def __init__(self):
        ID = ""

    # creates project (userList must be passed as a list)
    def createNewProject(self, ID):
        projectColl.insert_one({"Project ID": ID, "Users": [], "Guitar Amps": 0, "Microphones": 0}).inserted_id

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
            if self.userInProject(ID, user):
                return "Error: " + user + " already part of project!"  # change to simple already added error notif
            else:
                userList = self.getUserList(ID)
                userList.append(user)
                self.setUsers(ID, userList)
        else:
            return "invalid project ID, please try again or create a new project"  # change to simple invalid id notif

    # removes user from a project
    def leaveProject(self, ID, user):
        if self.doesProjectExist(ID):
            if self.userInProject(ID,user):
                userList = self.getUserList(ID)
                userList.remove(user)
                self.setUsers(ID, userList)
            else:
                return "Error: user already not enrolled in project"
        else:
            return "Error: project does not exist"

    # checks for valid Project ID
    def doesProjectExist(self, ID):
        if projectColl.count_documents({"Project ID": ID}, limit=1):
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

    # returns a list of the number of guitar amps (index 0) and microphones (index 1) checkout out to a given project
    def getCheckedOutUnits(self, ID):
        list = []
        list.append(projectColl.find({"Project ID": ID})[0].get("GuitarAmps"))
        list.append(projectColl.find({"Project ID": ID})[0].get("Microphones"))
        return list

    # Updates the project for the number of the item wanted to be checked out in the database
    # Works for both Guitar Amps and Microphones
    def checkOutProject(self, ID, amps, mics):
        toUpdate = {"Project ID": ID}
        prevOutList = self.getCheckedOutUnits(ID)
        newInfo = {"$set": {"Project ID": ID, "GuitarAmps": int(prevOutList[0]) + int(amps),
                            "Microphones": int(prevOutList[1]) + int(mics)}}
        projectColl.update_one(toUpdate, newInfo)
        newOutList = self.getCheckedOutUnits(ID)
        return [int(newOutList[0]), int(newOutList[1])]

    # Updates the project for the number of the item wanted to be checked into the database
    # Works for both Guitar Amps and Microphones
    def checkInProject(self, ID, amps, mics):
        toUpdate = {"Project ID": ID}
        prevOutList = self.getCheckedOutUnits(ID)
        if prevOutList[0] - amps < 0:
            newInfo = {"$set": {"Project ID": ID, "GuitarAmps": 0, "Microphones": prevOutList[1] - mics}}
        elif prevOutList[1] - mics < 0:
            newInfo = {"$set": {"Project ID": ID, "GuitarAmps": prevOutList[0] - amps, "Microphones": 0}}
        else:
            newInfo = {
                "$set": {"Project ID": ID, "GuitarAmps": prevOutList[0] - amps, "Microphones": prevOutList[1] - mics}}
        projectColl.update_one(toUpdate, newInfo)
        newOutList = self.getCheckedOutUnits(ID)
        return [int(newOutList[0]), int(newOutList[1])]
