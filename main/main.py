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
By Wednesday 2/22/23:

output what hardware is being sold (based on mongodb cluster data)
type name to show availability and capacity (xxx/yyy)
type check out / check in xxx adn updated numbers are shown
"""

#print list of all types of hardware in database, and what is available
def currentHardware():
        x = 0
        #print ("There are xx/yy hardware available")



currentHardware()
print ("Which type of hardware would you like to interact with?")
#input = next user input
#print posssible commands, ask to input desired command
#check for valid inoput, loop until valid
#run hardwareSet.____ based on what command is
command = ""
match command:
        case "check in":
                0
                #do this
        case "check out":
                0
                #do that