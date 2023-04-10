# This is the driver code that uses the hardwareSet class that you are writing.
import certifi
import pymongo
import pytest
import hardwareSet

ca = certifi.where()
client = pymongo.MongoClient(
    "mongodb+srv://jkressbach:CIrRa3yVV8dhnfKT@cluster0.v1qezrw.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=ca)
db = client["HardwareSet"]
posts = db["HWSet1"]

# Create object hwSet1 of class hardwareSet with capacity of 250
hwSet1 = hardwareSet.hardwareSet("GuitarAmps")


# testing checking out a number above capacity
def test_checkOutOverCapacityAmps():
    cap = hwSet1.getCapacity(posts, "GuitarAmps")
    hwSet1.mongo_check_out_item(posts, "GuitarAmps", cap + 1)
    checkedOut = hwSet1.getCheckedOut(posts, "GuitarAmps")
    assert checkedOut == cap


# testing checking out a number above capacity

def test_checkOutOverCapacityMics():
    cap = hwSet1.getCapacity(posts, "Microphones")
    hwSet1.mongo_check_out_item(posts, "Microphones", cap + 1)
    checkedOut = hwSet1.getCheckedOut(posts, "Microphones")
    assert checkedOut == cap


# testing checking in a number above capacity
def test_checkInOverCapacityAmps():
    cap = hwSet1.getCapacity(posts, "GuitarAmps")
    hwSet1.mongo_check_in_item(posts, "GuitarAmps", cap + 1)
    checkedIn = cap - hwSet1.getCheckedOut(posts, "GuitarAmps")
    assert checkedIn == cap


# testing checking in a number above capacity
def test_checkInOverCapacityMics():
    cap = hwSet1.getCapacity(posts, "Microphones")
    hwSet1.mongo_check_in_item(posts, "Microphones", cap + 1)
    checkedIn = cap - hwSet1.getCheckedOut(posts, "Microphones")
    assert checkedIn == cap


# testing checking out an arbitrary number below capacity
def test_checkOutAmps():
    cap = hwSet1.getCapacity(posts, "GuitarAmps")
    hwSet1.mongo_check_out_item(posts, "GuitarAmps", 30)
    checkedOut = hwSet1.getCheckedOut(posts, "GuitarAmps")
    availability = hwSet1.getAvailability(posts, "GuitarAmps")
    assert checkedOut == cap - availability


# testing checking out an arbitrary number below capacity
def test_checkOutMics():
    cap = hwSet1.getCapacity(posts, "Microphones")
    hwSet1.mongo_check_out_item(posts, "Microphones", 30)
    checkedOut = hwSet1.getCheckedOut(posts, "Microphones")
    availability = hwSet1.getAvailability(posts, "Microphones")
    assert checkedOut == cap - availability


# testing checking in an arbitrary number below capacity
def test_checkInAmps():
    cap = hwSet1.getCapacity(posts, "GuitarAmps")
    hwSet1.mongo_check_in_item(posts, "GuitarAmps", 20)
    checkedIn = cap - hwSet1.getCheckedOut(posts, "GuitarAmps")
    availability = hwSet1.getAvailability(posts, "GuitarAmps")
    assert checkedIn == availability


# testing checking in an arbitrary number below capacity
def test_checkInMics():
    cap = hwSet1.getCapacity(posts, "Microphones")
    hwSet1.mongo_check_in_item(posts, "Microphones", 20)
    checkedIn = cap - hwSet1.getCheckedOut(posts, "Microphones")
    availability = hwSet1.getAvailability(posts, "Microphones")
    assert checkedIn == availability


# using this to reset collections
def test_checkInCap():
    capAmps = hwSet1.getCapacity(posts, "GuitarAmps")
    capMics = hwSet1.getCapacity(posts, "Microphones")
    hwSet1.mongo_check_in_item(posts, "GuitarAmps", capAmps)
    hwSet1.mongo_check_in_item(posts, "Microphones", capMics)

# TODO: test set checkedOut, set availability, set capacity, get checkedOut, get availability, get capacity

# print("Capacity of GuitarAmps", hwSet1.getCapacity(posts, "GuitarAmps"))
# print("Checked out", hwSet1.getCheckedOut(posts, "GuitarAmps"), "Test Items")

# client.close()
