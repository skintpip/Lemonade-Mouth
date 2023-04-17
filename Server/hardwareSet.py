import pymongo


# import main

class hardwareSet:
    # collection: name of the collection you want to access
    # Description: name of the item
    # val: value to set
    # qty: value to check in or check out
    # cap: value to initialize the capacity of the item with
    # avail: value to initialize the availability of the item with

    # can be used by an administrator to create new hardware items (for future build)
    def mongo_init_item(self, collection, name, cap):
        collection.insert_one(
            {"Description": name, "Capacity": int(cap), "Availability": int(cap), "CheckedOut": 0}).inserted_id

    def getAvailability(self, collection, name):
        return int(collection.find({"Description": name})[0].get("Availability"))

    def getCapacity(self, collection, name):
        return int(collection.find({"Description": name})[0].get("Capacity"))

    def getCheckedOut(self, collection, name):
        return int(collection.find({"Description": name})[0].get("CheckedOut"))

    def setAvailability(self, collection, name, val):
        toUpdate = {"Description": name}
        newInfo = {"$set": {"Description": name, "Availability": val}}
        collection.update_one(toUpdate, newInfo)

    def setCapacity(self, collection, name, val):
        toUpdate = {"Description": name}
        newInfo = {"$set": {"Description": name, "Capacity": val}}
        collection.update_one(toUpdate, newInfo)

    def setCheckedOut(self, collection, name, val):
        toUpdate = {"Description": name}
        newInfo = {"$set": {"Description": name, "CheckedOut": val}}
        collection.update_one(toUpdate, newInfo)

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
            return -1, 0
        toUpdate = {"Description": name}
        oldAvail = self.getAvailability(collection, name)
        capacity = self.getCapacity(collection, name)
        checkedOut = self.getCheckedOut(collection, name)

        if oldAvail - qty <= 0:
            newInfo = {"$set": {"Description": name, "Availability": 0, "CheckedOut": capacity}}
            collection.update_one(toUpdate, newInfo)
            return 0, oldAvail
        if qty < oldAvail:
            newInfo = {"$set": {"Description": name, "Availability": oldAvail - qty, "CheckedOut": checkedOut + qty}}
            collection.update_one(toUpdate, newInfo)
            return 1, 0

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
        if (qty) < 0:
            return -1, 0
        toUpdate = {"Description": name}
        oldAvail = self.getAvailability(collection, name)
        capacity = self.getCapacity(collection, name)
        checkedOut = self.getCheckedOut(collection, name)
        if qty + oldAvail >= capacity:
            newInfo = {"$set": {"Description": name, "Availability": capacity, "CheckedOut": 0}}
            collection.update_one(toUpdate, newInfo)
            return 0, oldAvail
        else:
            newInfo = {"$set": {"Description": name, "Availability": oldAvail + qty, "CheckedOut": checkedOut - qty}}
            collection.update_one(toUpdate, newInfo)
            return 1, 0
