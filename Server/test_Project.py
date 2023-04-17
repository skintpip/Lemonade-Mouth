import project
import pymongo
import certifi


def testGetEnrolledProjects():
    user = "joeM58"
    testProject = project.Project()

    assert (testProject.getEnrolledProjects(user)) == ['Project1', 'Project2', 'Project3']


def testGetCheckedOutUnits():
    ID = "Project1"
    testProject = project.Project()

    assert testProject.getCheckedOutUnits(ID) == [0, 0]


def testUserInProject():
    ID = "Project1"
    user = "joeM58"
    fakeUser = "fakeUser"
    testProject = project.Project()

    assert testProject.userInProject(ID, user) == True
    assert testProject.userInProject(ID, fakeUser) == False