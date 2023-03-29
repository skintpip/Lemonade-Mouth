# def main():
#     # encrypt just a single text or does it take username and password
#     print("Enter a username: ")
#     user = input()
#     print("Enter your password to be encrypted (cannot use spaces or exclamation points): ")
#     inputText = input()
#     while checkInput(inputText) == False:
#         print("Invalid password. Enter a new password, with no spaces or exclamation points: ")
#         inputText = input()
#     print("Input your value for position shifting encryption (must be >= 1): ")
#     N = int(input())
#     while checkN(N) == False:
#         print("Invalid value. Enter a new value, greater than or equal to 1: ")
#         N = int(input())
#     print("Input your value for direction shifting encryption (1 fof forward, -1 for backward): ")
#     D = int(input())
#     while checkD(D) == False:
#         print("Invalid value. Enter a new value, either 1 or -1: ")
#         D = int(input())
#     print("Encrypted password:" + encrypt(inputText, N, D))
#

# helper function - ensures inputString is a valid input
def checkInput(inputText):
    for letter in inputText:
        letterValue = ord(letter)
        if letterValue < 34:
            return False
    return True


# helper function - ensures N is a valid input
def checkN(N):
    if N < 1:
        return False
    return True


# helper function - ensures D is a valid input
def checkD(D):
    if D == 1 or D == -1:
        return True
    return False


# Part 1 - takes an input string and decrypts it using the N and D parameters
def encrypt(inputText, N, D):
    encryptedText = ""

    # Reverse text
    inputText = inputText[::-1]

    for letter in inputText:
        letterValue = ord(letter) + (N * D)
        if (letterValue > 126):
            letterValue = letterValue - 93
        if (letterValue < 34):
            letterValue = letterValue + 93
        letter = chr(letterValue)
        encryptedText = encryptedText + letter
    return encryptedText


# Part 2 - decrypt takes an encrypted string and reverses the encryption process
def decrypt(encryptedText, N, D):
    inputText = ""
    for letter in encryptedText:
        letterValue = ord(letter) - (N * D)
        if (letterValue > 126):
            letterValue = letterValue - 93
        if (letterValue < 34):
            letterValue = letterValue + 93
        letter = chr(letterValue)
        inputText = inputText + letter

    # Reverse text
    inputText = inputText[::-1]

    return inputText


# Part 3 - reads a database txt file and decrypts usernames and passwords
def fileCheck():
    database = open("database.txt", "r")
    # print(database.read())
    for line in database:
        line = line.strip()
        words = line.split(' ')
        print("Username:" + decrypt(words[0], 3, 1) + "     Password:" + decrypt(words[1], 3, 1))
    database.close()


# 1. Of the 5 combinations, asamant and skharel are in the database with the same passwords as in the doc
# 2. aissa, bjha have different passwords in the databse than shown on the document
# 3. In the doc, "Ally!" is an invalid username, since there is an exclamation point used. In the database, however, it is present as "Ally" which is valid.



# fileCheck()
