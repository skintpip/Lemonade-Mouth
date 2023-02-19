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
