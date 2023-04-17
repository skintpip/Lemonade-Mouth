import project
import pymongo
import certifi
import user


def main():
    ca = certifi.where()
    client = pymongo.MongoClient(
        "mongodb+srv://jkressbach:CIrRa3yVV8dhnfKT@cluster0.v1qezrw.mongodb.net/?retryWrites=true&w=majority",
        tlsCAFile=ca)

    # testCreateUser()
    # testLoginExistingUser()
    testDoesUserExist()

    client.close()


def testCreateNewUser():
    testUser = user.User()

    assert testUser.createNewUser("yellow", "test") == "yellow"


def testLoginExistingUser():
    testUser = user.User()
    assert testUser.loginExistingUser("yellow", "test") == 1
    assert testUser.loginExistingUser("yellow", "wrongpassword") == 0
    assert testUser.loginExistingUser("fakeuser", "test") == -1


def testDoesUserExist():
    testUser = user.User()
    assert testUser.doesUserExist("yellow") == True
    assert testUser.doesUserExist("yello") == False


def testgGetPassword():
    testUser = user.User()
    assert testUser.getPassword("yellow") == "test"
