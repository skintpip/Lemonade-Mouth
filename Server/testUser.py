import project
import pymongo
import certifi
import user


def main():
    ca = certifi.where()
    client = pymongo.MongoClient(
        "mongodb+srv://jkressbach:CIrRa3yVV8dhnfKT@cluster0.v1qezrw.mongodb.net/?retryWrites=true&w=majority",
        tlsCAFile=ca)

    db = client["Users"]
    userColl = db["Logins2"]

    #testCreateUser()
    testLoginExistingUser()
    #testDoesUserExist()

    client.close()


def testCreateUser():
    testUser = user.User()

    testUser.createNewUser("Jonny2", "abc123")

def testLoginExistingUser():
    testUser = user.User()
    print(testUser.loginExistingUser("Jonny2", "abc123"))
    print(testUser.loginExistingUser("Jonny2", "notabc123"))

def testDoesUserExist():
    testUser = user.User()
    print(testUser.doesUserExist("Jonny2"))
    print(testUser.doesUserExist("not Jonny2"))





main()