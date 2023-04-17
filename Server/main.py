import pymongo
import certifi
ca = certifi.where()

# use this cluster
client = pymongo.MongoClient(
    "mongodb+srv://jkressbach:CIrRa3yVV8dhnfKT@cluster0.v1qezrw.mongodb.net/?retryWrites=true&w=majority",tlsCAFile=ca)
db = client["HardwareSet"]
posts = db["HWSet1"]


def addCluster(name, qty):
    # change this to have name, qty parameters and call hardwareSet constructor
    post = {"Description": name,
            "Capacity": qty,
            "Availability": qty,
            }
    post_id = posts.insert_one(post).inserted_id
    print(post)


# print list of all types of hardware in database, and what is available
def currentHardware(name):
    x = 0
    # myQuery = {"Description": name}
    # myDoc = posts.find(myQuery)
    # for i in myDoc:
    #     print(i)
    # test = posts[name]
    # cap = test["Capacity"]
    x = 0
    for i in posts.find({}, {"_id": 0, "Description": 1}):
        print(i)
        x += 1
    print(x)

currentHardware("Guitar Amps")
