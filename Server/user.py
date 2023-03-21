import pymongo
import cipher

class User:

    # local, not on mongo (erase later)
    def __init__(self, username, password):
        self.__username = username
        self.__password = cipher.encrypt(password)

    # -----------------------------------------------------------------------------------------------
    # mongo stuff

    # stores login for new user
    def mongo_init_newUser(self, collection, username, password):
        collection.insert_one({"Username": username, "Username": password}).inserted_id

    # returns encrypted password of a given user
    def getEncryptedPassword(self, collection, username):
        if self.doesUserExist(username):
            return collection.find({"Username": username})[0].get("Password")

    # returns decrypted password of a given user
    def getPassword(self, collection, username):
        if self.doesUserExist(username):
            return cipher.decrypt(collection.find({"Username": username})[0].get("Password"))

    # checks if a user already exists in the database
    def doesUserExist(self, collection, username):
        if collection.find({"Username": {"$in": username}}).count() > 0:
            return True
        return False
