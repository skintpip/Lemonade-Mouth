import pymongo
import cipher
import certifi

ca = certifi.where()

client = pymongo.MongoClient(
    "mongodb+srv://jkressbach:CIrRa3yVV8dhnfKT@cluster0.v1qezrw.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=ca)
db = client["Users"]
userColl = db["Logins"]


class User:

    # local, not on mongo (erase later)
    def __init__(self, username, password):
        self.__username = username
        self.__password = cipher.encrypt(password, 3, 1)

    # -----------------------------------------------------------------------------------------------
    # mongo stuff

    # stores login for new user in database (password is encrypted)
    def createNewUser(self, username, password):
        userColl.insert_one({"Username": username, "Password": cipher.encrypt(password, 3, 1)}).inserted_id
        return username

    # attempts to perform a login with provided username and password
    def loginExistingUser(self, username, password):
        if self.getPassword(username) == password:
            return username
        return None

    # checks if a user already exists in the database
    def doesUserExist(self, username):
        if userColl.count_documents({"Username": username},limit=1) != 0:
            return True
        return False

    def doesUserAndPassExist(self, username, password):
        encPass = cipher.encrypt(password,3,1) # TODO
        if userColl.count_documents({"Username": username},limit=1) != 0:
            if userColl.count_documents({"Password": password},limit=1) != 0:
                return True
        return False

    # returns decrypted password of a given user
    def getPassword(self, username):
        if self.doesUserExist(username):
            return cipher.decrypt(userColl.find({"Username": username})[0].get("Password"), 3, 1)
        return None

    # returns encrypted password of a given user (for testing, should not be required in execution)
    def getEncryptedPassword(self, username):
        if self.doesUserExist(username):
            return userColl.find({"Username": username})[0].get("Password")
        return None
