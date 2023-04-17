import project
import pymongo
import certifi


def main():
    ca = certifi.where()
    client = pymongo.MongoClient(
        "mongodb+srv://jkressbach:CIrRa3yVV8dhnfKT@cluster0.v1qezrw.mongodb.net/?retryWrites=true&w=majority",
        tlsCAFile=ca)
    db = client["Users"]
    projectColl = db["Projects"]

    #testGetEnrolledProjects()
    testGetCheckedOutUnits()

    client.close()




#def testCreateNewPorject():


def testGetEnrolledProjects():
    user = "joeM58"

    testProject = project.Project()

    print(testProject.getEnrolledProjects(user))


def testGetCheckedOutUnits():
    ID = "Project1"

    testProject = project.Project()

    print(testProject.getCheckedOutUnits(ID))


main()
