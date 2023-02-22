import pymongo

# use this cluster
client = pymongo.MongoClient(
    "mongodb+srv://jkressbach:CIrRa3yVV8dhnfKT@cluster0.v1qezrw.mongodb.net/?retryWrites=true&w=majority")
db = client["HardwareSet"]
posts = db["HWSet1"]


# capacity = posts.find({"Guitar Amps": "Capacity"})
# print(capacity)
# print(collection)
def addCluster():
    # change this to have name, qty parameters and call hardwareSet constructor
    post = {"Description": "Guitar Amps",
            "Capacity": "75",
            "Availability": "75",
            }
    post_id = posts.insert_one(post).inserted_id
    print(post)

    # post2 = {"Description": "Speaker",
    #         "Capacity": "100",
    #         "Availability": "100",
    #         }
    # post_id2 = posts.insert_one(post2).inserted_id
    # print(post2)


# print ("there are" + current.getAvailability() + current.getName() + "available")

"""
By Wednesday 2/22/23:

output what hardware is being sold (based on mongodb cluster data)
type name to show availability and capacity (xxx/yyy)
type check out / check in xxx adn updated numbers are shown
"""


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


# addCluster()
# currentHardware(input("Which type of hardware would you like to interact with?"))
currentHardware("Guitar Amps")
# returns available amount of hardware