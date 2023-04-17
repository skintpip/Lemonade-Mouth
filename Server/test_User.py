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


def testCreateUser():
    testUser = user.User("yellow", "test")

    testUser.createNewUser("yellow", "test")


def testLoginExistingUser():
    testUser = user.User("yellow", "test")
    print(testUser.loginExistingUser("Jonny2", "abc123"))
    print(testUser.loginExistingUser("Jonny2", "notabc123"))


def testDoesUserExist():
    testUser = user.User("yellow", "test")
    print(testUser.doesUserExist("yellow"))
    print(testUser.doesUserExist("yello"))


main()
