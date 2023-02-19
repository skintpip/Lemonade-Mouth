from pymongo import MongoClient
import hardwareSet


#use this cluster
client = MongoClient("mongodb+srv://jkressbach:CIrRa3yVV8dhnfKT@cluster0.v1qezrw.mongodb.net/?retryWrites=true&w=majority")
db = client.HardwareSet
posts = db.HWSet1
#print(collection)
def addCluster():
        # change this to have name, qty parameters and call hardwareSet constructor
        post = {"Description": "Guitar Amps",
                "Capacity": "75",
                "Availability": "75",
                }
        post_id = posts.insert_one(post).inserted_id
        print(post)


# print ("there are" + current.getAvailability() + current.getName() + "available")

"""
output what hardware is being sold (based on mongodb cluster data)
type name to show availability and capacity (xxx/yyy)
type check out / check in xxx adn updated numbers are shown
"""