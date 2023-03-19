import pymongo


class hardwareSet:

    # Capacity <-- total number of units. Initial value=qty
    # Availability <-- number of units available to check out.
    def __init__(self, name):
        self.__name = name
        self.__capacity = 0
        self.__availability = 0

    # initializes capacity to qty and performs one more step
    def initialize_capacity(self, qty):
        self.__capacity = qty
        self.__availability = qty

    # accessor function to return the number of unused units
    def get_availability(self):
        return self.__availability

    # accessor function to return the total capacity of units
    def get_capacity(self):
        return self.__capacity

    # accessor function to return the number of units currently checked out
    def get_checkedout_qty(self):
        return self.__capacity - self.__availability

    # mutator function to set the total capacity of units
    def set_capacity(self, qty):
        self.__capacity = qty

    """ method that checks out number of units specified by qty. This method
    should update the number of units available after check_out. This method should handle the
    situation if the quantity requested is greater than the current availability in the following
    manner: Allow users to check out the number of units that are available and then return error =
    -1 """

    def check_out(self, qty):
        # error: too many units requested
        if self.__availability < qty:
            self.__availability = 0
            return -1
        self.__availability -= qty
        return 0

    # method that checks in number of units specified by qty.
    # This method should update the number of units available after check_in. No error checking is required here
    def check_in(self, qty):
        self.__availability += qty

    # -------------------------------------------------------------------------------------------------------------------
    # New Functions for MongoDB Integration

    # collection: name of the collection you want to access
    # name: name of the item
    # val: value to set
    # qty: value to check in or check out
    # cap: value to initialize the capacity of the item with
    # avail: value to initialize the availability of the item with

    def getAvailability(self, collection, name):
        avail = collection.find({"Description": name})[0].get("Availability")
        return avail

    def getCapacity(self, collection, name):
        return collection.find({"Name" : name})[0].get("Capacity")

    def getCheckedOut(self, collection, name):
        collection.find({"Name": name})[0].get("CheckedOut")

    def setAvailability(self, collection, name, val):
        toUpdate = {"Name": name}
        newInfo = {"Name": name, "Availability": val}
        collection.update_one(toUpdate, newInfo)

    def setCapacity(self, collection, name, val):
        toUpdate = {"Name": name}
        newInfo = {"Name": name, "Capacity": val}
        collection.update_one(toUpdate, newInfo)

    def setCheckedOut(self, collection, name, val):
        toUpdate = {"Name": name}
        newInfo = {"Name" : name, "CheckedOut" : val}
        collection.update_one(toUpdate, newInfo)

    def mongo_init_item(self, collection, name, cap, avail):
        collection.insert_one({"Name": name, "Capacity": cap, "Availability": avail, "CheckedOut" : 0}).inserted_id

    def mongo_check_out_item(self, collection, name, qty):
        # def check_out(self, qty):
        #     if qty < 0:
        #         return -1
        #     elif self.__availability - qty < 0:
        #         self.__checkedout_qty = self.__capacity
        #         self.__availability = 0
        #         return -1
        #     elif qty < self.__availability:
        #         self.__availability = self.__availability - qty
        #         self.__checkedout_qty = qty
        #         return 0
        if qty < 0:
            return -1
        toUpdate = {"Name": name}
        oldAvail = collection.find({"Name" : name})[0].get("Availability")
        if oldAvail - qty < 0:
            newInfo = {"Name": name, "Availability": 0}
            collection.update_one(toUpdate, newInfo)
            return 0
        if qty < oldAvail:
            newInfo = {"Name" : name, "Availability" : oldAvail - qty}
            collection.update_one(toUpdate, newInfo)
            return 1

    def mongo_check_in_item(self, collection, name, qty):
        # def check_in(self, qty):
        #     if qty < 0:
        #         return -1
        #     elif qty + self.__availability > self.__capacity:
        #         self.__availability = self.__capacity
        #         self.__checkedout_qty = self.__availability
        #         return 0
        #     else:
        #         self.__availability = qty
        #         self.__checkedout_qty = self.__checkedout_qty + qty
        #         return 0
        if qty < 0:
            return -1
        toUpdate = {"Name": name}
        oldAvail = collection.find({"Name": name})[0].get("Availability")
        oldCap = collection.find({"Name" : name})[0].get("Capacity")
        checkedOut = collection.find({"Name" : name})[0].get("CheckedOut")
        if qty + oldAvail > oldCap:
            newInfo = {"Name" : name, "Availability" : oldCap, "CheckedOut" : checkedOut - qty}
            collection.update_one(toUpdate, newInfo)
            return 1
        else:
            newInfo = {"Name" : name, "Availability" : oldAvail + qty, "CheckedOut" : checkedOut - qty}
            collection.update_one(toUpdate, newInfo)
            return 0
