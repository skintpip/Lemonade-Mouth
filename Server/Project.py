import pymongo
import hardwareSet
class Project:

    # creates project (userList must be passed as a list)
    def createNewProject(self, collection, ID, userList):
        collection.insert_one({"Project ID": ID, "Users": userList}).inserted_id

    # update list of users added to a project (called in joiProject)
    def setUsers(self, collection, ID, UserList):
        toUpdate = {"Project ID": ID}
        newInfo = {"$set": {"Project ID": ID, "Users": UserList}}
        collection.update_one(toUpdate, newInfo)

    # checks if a user has been added to a project
    def userInProject(self, collection, ID, user):
        userList = self.getUserList(self, collection, ID)
        if user in userList:
            return True
        return False

    # adds user to project (returning varying errors if needed)
    def joinProject(self, collection, ID, user):
        if self.doesProjectExist(self, collection, ID):
            if self.userInProject(self, collection, ID):
                return "Error: " + user + " already part of project!"
            else:
                userList = self.getUserList(self, collection, ID)
                userList.append(user)
                self.setUsers(self, collection, ID, userList)
        else:
            return "invalid project ID, please try again or create a new project"

    # checks for valid Project ID
    def doesProjectExist(self, collection, ID):
        if collection.find({"Project ID": {"$in": ID}}).count() > 0:
            return True
        return False

    # returns list of users in a project for editability
    def getUserList(self, collection, ID):
        return collection.find({"Project ID": ID})[0].get("Users")
