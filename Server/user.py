import pymongo
import cipher


class User:

    # local, not on mongo (erase later)
    def __init__(self, username, password):
        self.__username = username
        self.__password = cipher.encrypt(password, 3, 1)

    # -----------------------------------------------------------------------------------------------
    # mongo stuff

    # stores login for new user in database (password is encrypted)
    def createNewUser(self, collection, username, password):
        collection.insert_one({"Username": username, "Password": cipher.encrypt(password, 3, 1)}).inserted_id
        return username

    # attempts to perform a login with provided username and password
    def loginExistingUser(self, collection, username, password):
        if self.getPassword(self, collection, username) == password:
            return username
        return None

    # checks if a user already exists in the database
    def doesUserExist(self, collection, username):
        if collection.find({"Username": {"$in": username}}).count() > 0:
            return True
        return False

    # returns decrypted password of a given user
    def getPassword(self, collection, username):
        if self.doesUserExist(collection, username):
            return cipher.decrypt(collection.find({"Username": username})[0].get("Password"), 3, 1)
        return None

    # returns encrypted password of a given user (for testing, should not be required in execution)
    def getEncryptedPassword(self, collection, username):
        if self.doesUserExist(collection, username):
            return collection.find({"Username": username})[0].get("Password")
        return None
